const sendButton = document.querySelector('.sendButton');
const mainForm=document.querySelector('.mainForm');

const isNumericInput = (event) => {
    const key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    );
};

const isModifierKey = (event) => {
    const key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        )
};

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if(!isNumericInput(event) && !isModifierKey(event)){
        event.preventDefault();
    }
};

const formatToPhone = (event) => {
    if(isModifierKey(event)) {return;}

    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
    const zip = input.substring(0,3);
    const middle = input.substring(3,6);
    const last = input.substring(6,10);

    if(input.length > 6){target.value = `(${zip}) ${middle} - ${last}`;}
    else if(input.length > 3){target.value = `(${zip}) ${middle}`;}
    else if(input.length > 0){target.value = `(${zip}`;}
};

const inputElement = document.getElementById('phoneNumber');
inputElement.addEventListener('keydown',enforceFormat);
inputElement.addEventListener('keyup',formatToPhone);

async function sendMessage(number, message) {
    try { 
        const response = await fetch(`https://twilio-handouts.herokuapp.com/${number}`, { 
            method: 'POST', 
            headers: { 
                'content-type': 'application/json',
                'apiKey': 'abc123',
            },
            body: JSON.stringify({ 
                message: `Please click here for your health care instructions:

${message}

This is an automated message. Please do not respond to this number. Call 9-1-1 in case of emergency.`,
            })
        }) 
        const data = await response.json();
        setTimeout(function(){
            document.querySelector('.alert').style.display='none';
        }, 3000);
    } catch (err) {
        console.log('uh oh there was an error');
    }
}

function handleSend(e) {
    e.preventDefault();
    
    console.log ('Sending!');

    let phoneNumber = document.querySelector('.sendNumber').value;
    phoneNumber = phoneNumber
        .split(' ')
        .join('')
        .split('(')
        .join('')
        .split(')')
        .join('')
        .split('-')
        .join('');
    phoneNumber = `+1${phoneNumber}`
    console.log(phoneNumber);

    handout = document.querySelector('.handoutToSend').value;
    console.log(handout);

    // show alert
    document.querySelector('.alert').style.display = 'block';

    // hide alert after 3 seconds
    sendMessage(phoneNumber, handout);
};

mainForm.addEventListener('submit', handleSend);



console.log('it works');

const sendButton = document.querySelector('.sendButton');
const mainForm=document.querySelector('.mainForm');



function handleSend(e) {
    e.preventDefault();
    
    console.log ('Sending!');

    phoneNumber = document.querySelector('.sendNumber').value;
    console.log(phoneNumber);

    handout = document.querySelector('.handoutToSend').value;
    console.log(handout);

    // show alert
    document.querySelector('.alert').style.display = 'block';

    // hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display='none';
    },3000);

};



mainForm.addEventListener('submit', handleSend);





let notifyMe=document.getElementById('button-submit');
const form = document.getElementById('contactForm');
const username = document.getElementById('formRegisterName');
const email = document.getElementById('formRegisterEmail');
const subject = document.getElementById('formRegisterSubject');
const message = document.getElementById('formRegisterMessage');
let joinIcon=document.getElementById('add_success_load_icon');
let SuccessText=document.getElementById('form-message-success');

	username.addEventListener("invalid", function(event){
		event.preventDefault()
	});

	email.addEventListener("invalid", function(event){
		event.preventDefault()
	});
	subject.addEventListener("invalid", function(event){
		event.preventDefault()
	});
	message.addEventListener("invalid", function(event){
		event.preventDefault()
	});

	notifyMe.addEventListener('click', () => {
		validateInputs();
	  });
	form.addEventListener("submit", e => {
		e.preventDefault();
		validateInputs();
		fetch(form.action, {
			method: "POST",
			body: new FormData(form),
		});
		return false;
	  });
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message');

    errorDisplay.innerHTML = "<p>" + message + "</p>";
    setTimeout(() => {
        errorDisplay.innerHTML = "";
    }, 4000);
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message');

    errorDisplay.innerHTML = "<i class=\"fa-solid fa-check\"></i><span style=\"font-size: 12px !important; margin: 0px 5px;\">Looks Good</span>";
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();

    console.log("Success");

    if(usernameValue === '') {
        setError(username, 'This field is required.');
    } else {
        setSuccess(username);
    }

	if(emailValue === '') {
        setError(email, 'Please enter your email address.');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

	if(subjectValue === '') {
        setError(subject, 'This field is required.');
    } else {
        setSuccess(subject);
    }

	if(messageValue === '') {
        setError(message, 'This field is required.');
    } else {
        setSuccess(message);
    }


    if (!usernameValue == '' && !emailValue == '' && !isValidEmail(emailValue) == false && !subjectValue == '' && !messageValue == '') {
		setTimeout(function(){
			joinIcon.style.display= "block";
		},100); 
		setTimeout(function(){
			joinIcon.style.display= "none";
		},2000); 
		setTimeout(function(){
			SuccessText.style.display= "block";
		},2000); 
		setTimeout(function(){
			location.reload();
		},8000); 
    }
};

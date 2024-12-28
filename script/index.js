document.getElementById('loginform').addEventListener('submit',function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(email === 'admin@empher.com' && password === 'empher@123'){
        localStorage.setItem('logindata', JSON.stringify({email}));
        alert('logged in as admin.');
        window.location.href='admin.html';
    }else if(email==='user@empher.com'&&password === 'user@123'){
        localStorage.setItem('loginData',JSON.stringify({email}));
        alert('logged in as user.');
        window.location.href = 'books.html';
    }else{
        alert('invalid credentials!');
    }
});
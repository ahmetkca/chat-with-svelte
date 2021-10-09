<script>
    import {replace} from "svelte-spa-router";
    import {loggedUser, username} from '../stores';
    import {toastList} from '../stores';
    import CustomPasswordField from './CustomPasswordField.svelte';
    export let loginView;
    export let socket;
    let email = '';
    let password = '';

    function handleRegisterView() {
      loginView = 'register'
    }
    function handleLoginView() {
        loginView = '';
    }

    function handleSubmit() {
        console.log("login submit");
        if (email.length == 0 || password.length == 0) {
          console.log("Email or password is invalid.")
          return;
        } 

        async function login(email, password) {
          const res = await fetch(`${import.meta.env.SNOWPACK_PUBLIC_API_URL}/api/users/login`, 
            {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  user: {
                    email,
                    password,
                    socketId: socket.id
                  }
              })
          })
          return res
        }
        login(email, password).then(function(res) {
          return res.json()
        }).then(function(res) {
          console.log(res);
          if (res?.errors) {
            Object.keys(res.errors).forEach(key => {
              toastList.push({
                variant: 'error',
                message: `${key} ${res.errors[key]}`,
                duration: 2000
              })
            })
          } else if (res?.user && res?.user?.token) {
            toastList.push({
                variant: 'success',
                message: `Logged in`,
                duration: 2500
            })
            loggedUser.set(res.user);
            username.set(res.user.username)
            replace('/')
          }
        })
    }
</script>

<!-- <div class="flex  bg-indigo-700"> -->
<div class="w-full max-w-xs m-auto bg-white rounded p-5">   
    <!-- header -->
    <header>
        <button on:click={handleLoginView} class="transition-colors duration-150 float-left w-8 h-8 absolute bg-orange text-white hover:bg-black hover:text-white p-0.5 rounded"><i class="fas fa-arrow-left"></i></button>
        <img class="w-20 mx-auto mb-5" src="https://avatars.dicebear.com/4.5/api/identicon/{email}.svg" alt="Login profile" />
    </header>
      
    <!-- form -->
    <form on:submit|preventDefault={handleSubmit}>
        <div>
            <label class="block mb-2 text-black" for="email">Email</label>
            <input bind:value="{email}" class="w-full p-2 mb-6 text-gray-800 border-b-2 border-orange outline-none bg-gray-200" type="email" name="email"
            placeholder="Enter your email" required>
          </div>
          <div>
            
            <CustomPasswordField bind:password />
          </div>
          <!-- <div>
            <label class="block mb-2 text-black" for="password">Password</label>
            <input class="w-full p-2 mb-6 text-white border-b-2 border-orange outline-none focus:bg-gray-300" type="password" name="password">
          </div> -->
          <div>          
            <input class="transition-colors duration-150 w-full bg-orange hover:bg-black hover:text-white text-white font-bold py-2 px-4 mb-6 rounded" type="submit">
          </div>
    </form>
    <!-- footer -->
    <footer>
        <a class="text-black hover:text-orange text-sm float-left" href="#">Forgot Password?</a>
        <button class="text-black hover:text-orange text-sm float-right" on:click={handleRegisterView}>Create Account</button>
      </footer> 
  </div>
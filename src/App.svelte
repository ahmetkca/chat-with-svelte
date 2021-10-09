<script>
    import ModalComponent from './components/Modal/ModalComponent.svelte';
    import Navbar from './components/Navbar.svelte';
    import SidebarNav from './components/SidebarNav.svelte';
    import ToastContainer from './components/ToastContainer.svelte';
    import {replace} from 'svelte-spa-router';
    import {username, isAuthenticated, loggedUser} from './stores';
    import './main.css';
    import Room from './Room.svelte';
    import CreateRoomForm from './CreateRoomForm.svelte';
    import {io} from 'socket.io-client';

    import {onDestroy, onMount} from 'svelte';
    
    const socket = io(import.meta.env.SNOWPACK_PUBLIC_API_URL);
    import Home from './Home.svelte';
    import JoinRoom from './JoinRoom.svelte';
    import Router from 'svelte-spa-router';
    import {wrap} from 'svelte-spa-router/wrap'
    import EnterName from "./EnterName.svelte";
    
    let routes = {
        '/': wrap({
            component: Home,
            props: {
                socket,
            },
            conditions: [
                (detail) => {
                    if ($username || $loggedUser) {
                        return true;
                    } else {
                        return false;
                    }
                }
            ]

        }),
        '/room/:roomid': wrap({
            component: Room,
            props: {
                socket,
            },
            userData: {
                from: 'room'
            },
            conditions: [
                (detail) => {
                    if ($username) {

                        if ($isAuthenticated) {
                            return true;
                        } else {
                            detail.userData.isAuthenticated = false;
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            ]
        }),
        '/createRoom': wrap({
            component: CreateRoomForm,
            props: {
                socket,
            },
            conditions: [
                (detail) => {
                    if ($username || $loggedUser) {
                        return true;
                    } else {
                        return false;
                    }
                }
            ]
        }),
        '/join': wrap({
            component: JoinRoom,
            props: {
                socket,
            },
            conditions: [
                (detail) => {
                    if ($username || $loggedUser) {
                        return true;
                    } else {
                        return false;
                    }
                }
            ]
        }),
        '/enterName': wrap({
            component: EnterName,
            props: {
                socket,
            }
        })
    }

    onMount(() => {
        console.log("App mounted");
        console.log(typeof import.meta.env.SNOWPACK_PUBLIC_API_URL);
        console.log(socket);
    })

    onDestroy(() => {
        console.log("App destroyed");
    })

    function conditionsFailed(event) {
        console.error('conditionsFailed event', event.detail)
        // Perform any action, for example replacing the current route
        if (!$username) {
            replace('/enterName');
        }
        if (event.detail.userData?.from === 'room') {
            if (!event.detail.userData?.isAuthenticated) {
                replace('/');
            }
        }
    }
</script>
<svelte:head>
    <script src="https://kit.fontawesome.com/c73f328f85.js" crossorigin="anonymous"></script>
</svelte:head>

<ToastContainer location="top-right" />

<!-- <main> -->
    <!-- <Navbar/> -->
    
    <SidebarNav>
        <Router {routes} on:conditionsFailed={conditionsFailed}/>
    </SidebarNav>
    <!-- {#if $username}
        <Router {routes} on:conditionsFailed={conditionsFailed}/>
    {:else}
        <EnterName {socket} />
    {/if} -->
    <!-- <Router {routes} on:conditionsFailed={conditionsFailed}/> -->
<!-- </main> -->



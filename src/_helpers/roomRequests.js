
export let joinRoom = (roomId, roomPassword) => {
    const res = fetch(`${import.meta.env.SNOWPACK_PUBLIC_API_URL}/joinRoom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomId: roomId,
            roomPassword: roomPassword
        })
    })
    return res;
};
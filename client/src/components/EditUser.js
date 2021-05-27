

export const Deletename = async (props) =>{
    
    const name='';
    const email = props.email;
    const address = props.address;

    const res = await fetch("/edit", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            
            name,email,address

        })
    })
    const data = await res.json();
        window.alert(data.message);
        console.log(data.message);  
    
}

export const Deleteaddress = async (props) =>{
    
    const name=props.name;
    const email = props.email;
    const address = '';

    const res = await fetch("/edit", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            
            name,email,address

        })
    })
    const data = await res.json();
        window.alert(data.message);
        console.log(data.message);  
    
}

export const EditData = async (props) =>{
    
    const {name,email,address} = props;

    const res = await fetch("/edit", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            
            name,email,address

        })
    })
    const data = await res.json();
        window.alert(data.message);
        console.log(data.message);  
    
}
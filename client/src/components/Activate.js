import React ,{useEffect} from 'react';
import { NavLink ,useHistory} from "react-router-dom";


const Activate = (props) => {
    const token=props.match.params.token;
    const history = useHistory();
    const activate = async()=>{
        
        const res = await fetch("/email-activate", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                token

            })
        });
        
        const data = await res.json();

        if(data.status === 400 || data.error){
            window.alert(data.error);
            console.log(data.error);
        }
        else{
            
            window.alert(data.message);
            console.log(data.message);

            
        }
        history.push("/");
    }

    useEffect(() => {
        activate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (
        <div className="login-dark">
         <div style={{color:'grey',top:'20%',textAlign:'center',left:'17%',position:'absolute'}}>
                <h1 style={{fontSize:'100px'}}>Account Activation Page</h1>
                
        </div>
        </div>
    );
    
}

export default Activate;
import React, { useEffect ,useState} from 'react';
import { useHistory } from "react-router-dom";
import '../index.css'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Deletename,Deleteaddress,EditData} from './EditUser';
import Modal from 'react-bootstrap/Modal'

const About = () => {
  const history = useHistory();
  const [user,setuser]=useState({
    name:"",
    email:"",
    address:""
})

const [useredit,setuseredit]=useState({
  name:"",
  email:"",
  address:""
})

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      
      setuser(data)
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/");
    }
  };


  const [showuser, setShowuse] = useState(false);
    const [showadd, setShowadd] = useState(false);

    const InputEvent=(event)=>{
      const {name,value}=event.target;
      
      setuseredit((preVal)=>{
        return {
          ...preVal ,
          [name]:value ,
        }
      })
    }


  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
        <>
            <div className="login-dark1" >
                    <form  method="GET" style={{width:'200%'}}>
                        
                            <div className="col md-4">
                                <AccountBoxIcon style={{fontSize:'100px',marginLeft:'110px',marginTop:'-20px'}}/>
                            </div>
                            <div  style={{display:'flex'}}>
                            <div className="col md-4">
                                <p>Username:</p>
                                <p>Email:</p>
                                <p>Address:</p>

                            </div>
                            <div className="col textColor" style={{marginLeft:'30px'}}>

                                <p>{user.name} <EditIcon style={{marginLeft:'20px'}} onClick={() => {setShowuse(true);setuseredit(user)}}/> 
                                <DeleteIcon style={{marginLeft:'20px'}} onClick={()=>{setuser({name:'',email:user.email,address:user.address});Deletename(user)}}/>
                                </p>

                                <p>{user.email}</p>

                                <p className='p_wrap'>{user.address} <EditIcon style={{marginLeft:'20px'}} onClick={() => {setShowadd(true);setuseredit(user)}}/>
                                 <DeleteIcon style={{marginLeft:'20px'}} onClick={()=>{setuser({name:user.name,email:user.email,address:''});Deleteaddress(user)}}/>
                                </p>

                            </div>
                        </div>
                    </form>
                </div>

        <Modal show={showuser} onHide={() => setShowuse(false)} >
        <Modal.Header >
          <Modal.Title>Edit Username</Modal.Title>
        </Modal.Header>
        <input style={{width:'80%',marginLeft:'auto',marginRight:'auto'}} type="text"  name="name" value={useredit.name} onChange={InputEvent}  placeholder="username"/>
        <Modal.Footer>
          <button variant="secondary" onClick={() => {setShowuse(false)}}>
            Close
          </button>
          <button variant="primary" onClick={() => {setuser((preVal)=>{
			return {
				...preVal ,
				name:useredit.name ,
			}
		});setShowuse(false);EditData(useredit)}}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>


      <Modal show={showadd} onHide={() => setShowadd(false)} >
        <Modal.Header >
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <textarea style={{width:'80%',marginLeft:'auto',marginRight:'auto'}} type="text" row='3'  name="address" value={useredit.address} onChange={InputEvent}  placeholder="address"/>
        <Modal.Footer>
          <button variant="secondary" onClick={()=>{setShowadd(false)}}>
            Close
          </button>
          <button variant="primary" onClick={() => {setuser((preVal)=>{
			return {
				...preVal ,
				address:useredit.address ,
			}
		});setShowadd(false);EditData(useredit)}}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
        </>
    );
    
}

export default About;

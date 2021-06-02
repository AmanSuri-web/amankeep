import React, { useEffect ,useState} from 'react';
import { useHistory } from "react-router-dom";
import '../index.css'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Deletename,Deleteaddress,EditData,AddImage} from './EditUser';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'



const About = () => {
  const history = useHistory();
  const [user,setuser]=useState({
    fname:"",
  lname:"",
  name:"",
  email:"",
  address:"",
  picture:""
  
})
const [ pic,setpic ] = useState("")
const [useredit,setuseredit]=useState({
  fname:"",
  lname:"",
  name:"",
  email:"",
  address:"",
  
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
      console.log(user.picture)
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
    const onChangeFile = (e)=>{
      setpic(e.target.files[0])
      
    }
   
    const ChangeOnClick = async(e)=>{
      e.preventDefault()
      
      console.log(pic)
      const formData = new FormData();
      
      formData.append("email",user.email);
      formData.append("file",pic);
      console.log(formData)
      
      try {
        const res = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const data = await res.json();
        console.log(data);
        window.alert(data);
      }catch (err) {
        
        
          console.log("There was a problem with the server");
        
      }
    }
    

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
        <>
            <div className="login-dark1" >
                    <form  method="GET" style={{width:'200%'}} enctype="multipart/form-data">
                          <img src={user.picture} alt="img"/>
                            <div className="col md-4">
                                <AccountBoxIcon style={{fontSize:'100px',marginLeft:'110px',marginTop:'-20px'}}/>
                            </div>
                            <div  style={{display:'flex'}}>
                            <p>Username:    </p><p className="textColor" style={{marginLeft:'50px'}}>{user.name}</p>
                            </div>
                            <div  style={{display:'flex'}}>
                            <div className="col md-4">
                               
                                
                                <p>First Name:</p>
                                <p>last Name:</p>
                                <p>Email:</p>
                                <p>Bio:</p>

                            </div>
                            <div className="col textColor" style={{marginLeft:'30px'}}>

                                
                                <p>{user.fname}</p>
                                <p>{user.lname}</p>
                                <p>{user.email}</p>

                                <p className='p_wrap'>{user.address} <EditIcon style={{marginLeft:'20px'}} onClick={() => {setShowadd(true);setuseredit(user)}}/>
                                 <DeleteIcon style={{marginLeft:'20px'}} onClick={()=>{setuser({name:user.name,email:user.email,address:''});Deleteaddress(user)}}/>
                                </p>

                            </div>
                        </div>
                        <div className="form-group">
                <label htmlFor="exampleFormControlFile1">
                  Choose profile image
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  onChange={onChangeFile}
                />
              <button onClick = {ChangeOnClick}> Upload</button> 
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

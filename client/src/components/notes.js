import React,{useState,useEffect} from 'react';
import "../index.css";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import logo from './logo.png';

import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';


const App = () => {
	/*header*/
	/*createNote*/
	/*note*/
	/*footer*/
	 
  const [user,setuser]=useState({
    
  name:"",
  email:"",
  
 	
})
  const[addItem,setAddItem]=useState([])
  const[addPin,setaddPin]=useState([])
  const AddNote = async (props) =>{
	    const email=user.email
	    const name=user.name
	    
	    const note=props
	    const res = await fetch("/addnote", {
	        method:"POST",
	        headers:{
	            "Content-Type": "application/json"
	        },
	        body: JSON.stringify({
	            
	            name,email,note

	        })
	    })
	    const data = await res.json();
	        
        console.log(data.message);  
    
	}	
	const RemNote = async (props) =>{
	    const email=user.email
	    const name=user.name
	    
	    console.log(props)
	    const res = await fetch("/remnote", {
	        method:"POST",
	        headers:{
	            "Content-Type": "application/json"
	        },
	        body: JSON.stringify({
	            
	            name,email,props

	        })
	    })
	    const data = await res.json();
	        
        console.log(data.message);  
    
	}	
	const AddLNote = async (props) =>{
	    const email=user.email
	    const name=user.name
	    
	    console.log(props);
	    const res = await fetch("/addlnote", {
	        method:"POST",
	        headers:{
	            "Content-Type": "application/json"
	        },
	        body: JSON.stringify({
	            
	            name,email,props

	        })
	    })
	    const data = await res.json();
	        
        console.log(data.message);  
    
	}	
	const RemLNote = async (props) =>{
	    const email=user.email
	    const name=user.name
	    
	    console.log(props)
	    const res = await fetch("/remlnote", {
	        method:"POST",
	        headers:{
	            "Content-Type": "application/json"
	        },
	        body: JSON.stringify({
	            
	            name,email,props

	        })
	    })
	    const data = await res.json();
	        
        console.log(data.message);  
    
	}	
	const callNotePage = async () => {
    try {
      const res = await fetch("/getnote", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      const {name,email,mnote,lmnote} = data;
      
      setuser({name,email});
      
       setAddItem(mnote);
      setaddPin(lmnote);
      if(lmnote.length>=1){
      	setLabel1("LABELLED")
		setLabel2("OTHERS")
      }
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      
    }
  };
  

useEffect(() => {
    callNotePage();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  


	const[note,setNote]=useState({
		title:"",
		content:"",
	})
	

	const InputEvent=(event)=>{
		const {name,value}=event.target
		setNote((prevData)=>{
			return{
				...prevData,
				[name]:value,
			}
		})
	}
	
	const addEvent=()=>{
		
		setAddItem((prevData)=>{
			return [...prevData,note];
		})
		console.log(note)
		
		setNote({
			title:"",
			content:"",
		})
		setExpand(false);
		AddNote(note);
		
	}
	const deleteEvent=(index)=>{
		setAddItem((prevData)=>{
			return prevData.filter((arrElement,i)=>{
				return index!=i;
			})
		})
		
		RemNote(addItem[index])
	}
	const deleteEventpin=(index)=>{

		setaddPin((prevData)=>{
			return prevData.filter((arrElement,i)=>{
				return index!=i;
			})
		})
		
		if(addPin.length<=1){
			
			addLabel(false)
			
		}
		else{
			
			addLabel(true)
		}
		RemLNote(addPin[index])
	}
	const[expand,setExpand]=useState(false)
	const expandIt=()=>{
		setExpand(true);
	}
	
	
	const pinEvent=(val,index)=>{
		
		setaddPin((prevData)=>{
			return [...prevData,val];
		})
		addLabel(true);
		AddLNote(addItem[index]);
	}
	const addAgain=(val,index)=>{
		
		setAddItem((prevData)=>{
			return [...prevData,val];
		})
		AddNote(addPin[index]);
	}
	
	const [label1,setLabel1]=useState("")
	const [label2,setLabel2]=useState("")
	const addLabel=(event)=>{
		if(event){
		setLabel1("LABELLED")
		setLabel2("OTHERS")}
		else{
			setLabel1("")
		setLabel2("")}
		
	}
	return (<>	
			
			


			<div className="card" style={{}}>
			
				<form action="" className="mt-2"  autoComplete="off">
				{expand?
					<input type="text" name="title" value={note.title} onChange={InputEvent} placeHolder={"Title"}/>:null}
					<textarea placeHolder={"Add a note..."} name="content" value={note.content} onChange={InputEvent} id="" cols="" rows="3" className="mt-3" 
					style={{border:'0',
						width:'295px',
						fontWeight:'200'}} onClick={expandIt}></textarea>
						{expand?
					<Button style={{borderRadius:'50%',
							marginLeft:'230px',
							cursor: 'pointer',
							boxShadow: '5px 5px 15px -5px  rgba(0,0,0,0.3)',
							color:'#ffae42',
							}}
							className="btn_green" onClick={addEvent}><AddIcon/></Button>:null}
				</form>
				
			</div>
			<div style={{display:'grid'}}>
			<h5 style={{fontSize:"12px",marginLeft:"15px"}}>{label1}</h5>
			<div className="mt-5 grid-container" >
			
			
			{addPin.map((val,index)=>{
				return(
					<div className="note">
					<div style={{position:'relative',}}>
				<h1>{val.title}</h1>
				<Tooltip title="Remove label">
				<Button style={{top: '0' ,
				right:' 0 ',
				position: 'absolute' ,
	
				}} onClick={()=>{addAgain(val,index);deleteEventpin(index)}}><TurnedInIcon/></Button>
				</Tooltip>
				</div>
				<br/>
				<p>{val.content}</p>
				<Button style={{borderRadius:'50%',
							marginLeft:'170px',
							
							boxShadow: '5px 5px 15px -5px  rgba(0,0,0,0.3)',
							
							color:'#ffae42',
							}}
							className="todo_style_button" onClick={()=>{deleteEventpin(index)}}><DeleteIcon/></Button>
			</div>	
				)
			})}
			</div>
			
			<h5 style={{fontSize:"12px",marginLeft:"15px"}}>{label2}</h5>
			<div className="mt-5 grid-container " >
			
            
			
			{addItem.map((val,index)=>{
				
				return(
					<div className="note grid-item">
					<div style={{position:'relative',}}>
				<h1>{val.title}</h1>
				<Tooltip title="Label note">
				<button className="btn_hide" onClick={()=>{pinEvent(val,index);deleteEvent(index)}}><TurnedInNotIcon/></button>
				</Tooltip>
				</div>
				<br/>
				
				<p style={{whiteSpace: 'pre-line',}}>{val.content}</p>
				
				<Button style={{borderRadius:'50%',
							marginLeft:'170px',
							cursor: 'pointer',
							boxShadow: '5px 5px 15px -5px  rgba(0,0,0,0.3)',
							
							color:'#ffae42',
							}}
							className="todo_style_button" onClick={()=>{deleteEvent(index)}}><DeleteIcon/></Button>
			</div>	
				)
			})}
			</div>
			</div>
			
		</>
	);
};

export default App;

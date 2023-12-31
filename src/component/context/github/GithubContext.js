import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext=createContext();
const GITHUB_URL=process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN=process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider=({children})=>{
    const initialState={
        users:[],
        user:{},
        loading:false,
    }
    const [state, dispatch]=useReducer(GithubReducer, initialState);

    const fetchUsers=async(text)=>{
        setLoading();
        const params=new URLSearchParams({
            q:text
        })
        const response=await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        })

        const {items}=await response.json();
        // console.log(items)
       
        dispatch({
            type:'GET_USERS',
            payload: items,
        })

       
    }

    const getUsers=async(login)=>{
        setLoading();
      
        const response=await fetch(`${GITHUB_URL}//users?${login}`, {
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        })

        if(response.status===404){
            window.location='/notfound'
             const data=await response.json();
        // console.log(items)
       
        dispatch({
            type:'GET_USER',
            payload: data,
        })
        }
        else{

        }

       

       
    }

    const setLoading=()=>dispatch({
        type:'SET_LOADING'
    })

    return <GithubContext.Provider value={{users:state.users,user:state.user,loading:state.loading,fetchUsers}}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext
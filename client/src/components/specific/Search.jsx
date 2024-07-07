import React, { useEffect, useState } from 'react';
import { Dialog, Stack, DialogTitle, TextField, InputAdornment, List } from '@mui/material';
import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
//import { sampleUser } from '../../constants/sampleData';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import toast from 'react-hot-toast'

const Search = () => {
  const { isSearch } = useSelector(state => state.misc);
  const [searchUser]=useLazySearchUserQuery();
  const [sendFriendRequest]=useSendFriendRequestMutation();

  const dispatch = useDispatch(); // Correct useDispatch call

  const search = useInputValidation('');
  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    console.log(id);
    try {
     const res=  await sendFriendRequest({userId:id});
     if(res.data){
      toast.success("Friend request sent");
      console.log(res.data);
    } else{
      toast.error(res?.error?.data?.message|| "Something went wrong");
}
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));
  //console.log("efs");

  useEffect(()=>{
      const timeOutId=setTimeout(()=>{

      searchUser(search.value).then(({data})=>setUsers(data.users)).catch((e)=>console.log(e));

      
      },1000)
      return ()=>{
        clearTimeout(timeOutId);
      };

    

  },[search.value])

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((i) => (
            <UserItem user={i} key={i._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;

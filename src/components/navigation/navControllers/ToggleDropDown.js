function toggleDropDown (e, tasks, setDropDown, dropDown){

        if(tasks !== undefined){
            e.preventDefault();
            setDropDown(!dropDown);

       return; 
    };
};

export default toggleDropDown; 
const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 5500;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    return res.json({
        success:true,
        message:"Everything is running"
    })
})


app.get('/api/users/:user', (req,res) => {
    let user = req.params.user;
    let access_level = req.query.access_level;

    let fileContent = JSON.parse(fs.readFileSync('store.json','utf-8'));

    let userData = fileContent.find(data => data.name = user);

    if(access_level == 'public'){
        return res.json({
            success:true,
            message:"User Public Data fetched successfully",
            data:userData.public
        });
    }else if(access_level == "private"){
        return res.json({
            success:true,
            message:"User Private Data fetched successfully",
            data:userData.private
        });
    }else{
        return res.json({
            success:true,
            message:"User data fetched successfully",
            data:{
                public:{
                    ...userData.public
                },
                private:{
                    ...userData.private
                }
            }
        })
    }

});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
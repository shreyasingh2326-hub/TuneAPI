const jwt = require("jsonwebtoken");

//for middlewares we use three parameters

async function authArtist(req,res,next){
    // token verify krwainge qki token mei we have id and role to usse hmlog pta kr skte h role kya h user ka

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }                 // checks token aa rha ya nhi aa rha h

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);  //jwt.verify tokens and if token is wrong then error if token is 
                                                                  //correct to jis data k sath token create kiye h wo mil jaiga


        if(decoded.role!=="artist"){
            return res.status(403).json({
                message:"You dont have access"
            })
        }

        req.user = decoded; //req k andar ek new property is created user and uska value is decoded

        next() // it is used so that request middleware se aage jaa ske mtlb music.routes mei middleware jo use hua
        // hai api mei uss middleware se aage process kr k multer mei jane k liye 
    }

    catch(err){
        console.log(err);
        return res.status(401).json({
            messsage: "Some error is caused"
        })
    }

}

async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(decoded.role!=="user" && decoded.role!=="artist"){
            return res.status(401).json({
                message: "You dont have access"
            })
        }
        req.user = decoded;
        next();
    }

    catch(err){
        console.log(err);
        return res.status(401).json({
            message: "Some error Occurred"
        })

    }
}

module.exports= {authArtist, authUser}

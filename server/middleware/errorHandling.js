const MyError = require('../models/MyError');

let errorHandler = () => async (err,req,res,next) => {

  switch(err.name){
    
    case 'MongoError':
      console.log("MONGOERROR");
      if( err.code === 11000){
        next(new MyError(409,'Alguna de tus credenciales ya fue utilizada.'));
      } else {
        next(err);
      }
      break;
      
      case 'CastError':
      console.log("CASTERROR");
      next(new MyError(400,'El valor "' + err.value + '" no es aceptado para el campo: ' + err.kind))
      break;
      
    case 'ValidationError':
      let msg = '';
      for(type in err.errors){
        if(msg.length > 0){
          msg+= " ";
        }
        msg+=err.errors[type].message;
      }
      next(new MyError(409,msg, err.stack))
      break;
      
    case 'ReferenceError':
      console.log("REFERENCEERROR")
      console.log(err.message)
      next(new MyError(400, "Hubo un error en el campo "+ err.message.split(' ')[0], err.stack));
      break;
        
    case 'CustomError':
      next(err)
      break;
      
    case 'JsonWebTokenError': 
      console.log('err jwt :>> ', err);  
      next(new MyError(401, 'You need to be logged in to do that.'))
      break;

    case 'StripeInvalidRequestError':
      next(new MyError(400, err.raw.message))
      break;
    default:
      console.log('err :', err);
      console.log('=============================')
      if(process.env.NODE_ENV === 'production'){
        next(new MyError(500, "SERVER ERROR"));
      }
  }

}


module.exports = errorHandler;
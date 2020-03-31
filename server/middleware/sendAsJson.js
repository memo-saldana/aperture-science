let sendAsJson = () => async (err, req, res, next) => {
  console.log('err :', err);
  if(process.env.NODE_ENV !== 'dev'){
    if(err.statusCode !== 500){
        // console.log('err :', err);
       return res.status(err.statusCode).json({code: err.statusCode, name: err.name, message: err.message})
    } else {
        return res.status(500).send("SERVER ERROR");
    }
  } else {
    next(err);
  }
}
module.exports = sendAsJson;
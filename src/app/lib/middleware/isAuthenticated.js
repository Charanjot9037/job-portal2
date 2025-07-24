import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res) => {
  try {
  const token=req.cookies.token;
  if(!token){
     return NextResponse.json({ error: 'User not authenticated' }, { status: 404 });
  }
  const decode = await jwt.verify(token,process.env.JWT_SECRET);
  if(!decode){
     return NextResponse.json({ error: 'User not authenticated' }, { status: 404 });
  } 
  lin
  req.id=decode.userId;
  }
  catch(error) {

  }
}
export default isAuthenticated;

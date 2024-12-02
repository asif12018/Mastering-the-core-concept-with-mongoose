import {Request, Response} from 'express'
import { StudentServices } from './student.service';

 const createStudent = async(req: Request,res: Response) =>{
   
  try{
    const student = req.body;
    // will call service func to send this data
      const result = await StudentServices.createStudentIntoDB(student);
    // sent response
  
    res.status(200).json({
      success:true,
      message:'Student is created successfully',
      data: result
    })
  }catch(err){
    console.log('err from student controller',err)
  }

}

export const StudentControllers = {
  createStudent,
}


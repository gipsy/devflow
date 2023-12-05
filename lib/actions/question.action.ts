"use server"

import { connectToDatabase } from "@/lib/mongoose";
import Question              from "@/database/question.model";
import Tag                   from "@/database/tag.model";
// import User                  from "@/database/user.model";
import {
  CreateQuestionParams,
  GetQuestionsParams
}       from "./shared.types";
import { revalidatePath }    from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase()
    
    const questions = await Question.find(params)
      // .populate({ path: 'tags', model: Tag })
      // .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })
      // .exec()
    
    return { questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase()
    
    const { title, content, tags, author, path } = params
    
    // Create the question
    const question = await Question.create({
      title,
      content,
      author
    })
    
    const tagDocuments = []
    
    // Create the tags or get if they already exists
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {name: { $regex: new RegExp(`^${tag}$`, "i") }},
        {$setOnInsert: { name: tag }, $push: { question: question._id }},
        {upset: true, new: true},
      )
      
      tagDocuments.push(existingTag._id)
      
      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: tagDocuments } }
      })
      
      
      // Create an interaction record for the user's ask_question action
      
      // Increment author's reputation by +5 for creating an action
  
      revalidatePath(path)
    }
  } catch (error) {
    console.log(error)
  }
}

"use server"

import { connectToDatabase } from "@/lib/mongoose";
import Question              from "@/database/question.model";
import Tag                   from "@/database/tag.model";
import User                  from "@/database/user.model";
import {
  CreateQuestionParams,
  GetQuestionsParams,
  GetQuestionByIdParams
}       from "./shared.types";
import { revalidatePath }    from "next/cache";
import { FilterQuery } from "mongoose";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase()

    const { page = 1, pageSize = 10, searchQuery, filter } = params

        // Calculcate the number of posts to skip based on the page number and page size
        const skipAmount = (page - 1) * pageSize;

        const query: FilterQuery<typeof Question> = {};
    
        if(searchQuery) {
          query.$or = [
            { title: { $regex: new RegExp(searchQuery, "i")}},
            { content: { $regex: new RegExp(searchQuery, "i")}},
          ]
        }
    
        let sortOptions = {};
    
        switch (filter) {
          case "newest":
            sortOptions = { createdAt: - 1 }
            break;
          case "frequent":
            sortOptions = { views: -1 }
            break;
          case "unanswered":
            query.answers = { $size: 0 }
            break;
          default:
            break;
        }
    
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions)
    
      const totalQuestions = await Question.countDocuments(query);

      const isNext = totalQuestions > skipAmount + questions.length;
  
    return { questions, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase()

    const { questionId } = params
    console.log('questionID', questionId)

    const question = await Question.findById(questionId)
      .populate({path: 'tags', model: Tag, select: '_id name'})
      .populate({path: 'author', model: User, select: '_id clerkId name picture'})

    return question
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
        {upsert: true, new: true},
      )
      
      tagDocuments.push(existingTag._id)
    }
      
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    })
      
    // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating an action
  
    revalidatePath(path)
  } catch (error) {
    console.log(error)
  }
}

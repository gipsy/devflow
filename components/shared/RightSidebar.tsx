import React           from 'react'
// import { className }   from "postcss-selector-parser";
// import { application } from "express";
import Link            from "next/link";
// import Image     from "next/link";
import RenderTag from "@/components/shared/RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: '1',
      title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?'
    },
    {
      _id: '2',
      title: 'Is it only me or the font is bolder than necessary?'
    },
    {
      _id: '3',
      title: 'Can I get the course for free?'
    },
    {
      _id: '4',
      title: 'Redux Toolkit Not Updating State as Expected'
    },
    {
      _id: '5',
      title: 'Async/Await Function Not Handling Errors Properly'
    }
  ]
  
  const popularTags = [
    {
      _id: '1',
      name: 'javascript',
      totalQuestions: '5'
    },
    {
      _id: '2',
      name: 'rust',
      totalQuestions: '1'
    },
    {
      _id: '3',
      name: 'python',
      totalQuestions: '4'
    },
    {
      _id: '4',
      name: 'ror',
      totalQuestions: '3'
    },
    {
      _id: '5',
      name: 'php',
      totalQuestions: '2'
    },
  ]
  return (
    <section className="
      custom-scrollbar
      background-light900_dark200
      light-border
      sticky
      left-0
      top-0
      flex
      h-screen
      w-fit
      flex-col
      justify-between
      overflow-y-auto
      border-r
      p-6
      pt-36
      shadow-light-300
      dark:shadow-none
      max-sm:hidden
      lg:w-[266px]
    ">
      <div>
        <h3 className="h3-bold text-dark200_light900">
          Top Questions
        </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(question => {
            return (
              <Link
                key={question._id}
                href={`/questions/${question._id}`}
                legacyBehavior
                passHref
              >
                <a className="flex cursor-pointer items-center justify-between gap-7">
                  <p className="body-medium text-dark500_light700">
                    {question.title}
                  </p>
                  { /* <Image */ }
                  { /*  src="/assets/icons/chevron-right.svg" */ }
                  { /*  alt="chevron right" */ }
                  { /*  width={20} */ }
                  { /*  height={20} */ }
                  { /*  className="invert-colors" */ }
                  { /* /> */ }
                </a>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar

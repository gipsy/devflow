"use client"

import React from 'react'

import Link          from "next/link"
import Image            from "next/image"
import { Button }       from "@/components/ui/button"
// import { SignedOut }    from "@clerk/nextjs"
import { sidebarLinks } from "@/constants"
import { usePathname }  from "next/navigation"

const LeftSidebar = () => {
  const pathname = usePathname()
  
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
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route)
            && item.route.length > 1) || pathname === item.route
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${isActive
                ? 'primary-gradient rounded-lg text-light-900'
                : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}>{item.label}</p>
            </Link>
          )
        })}
      </div>
      <div className="flex flex-col gap-3">
        <Link href="/sign-in">
          <Button
            className="
              inline-flex items-center justify-center
              text-sm font-medium transition-colors
              focus-visible:outline-none focus-visible:ring-1
              focus-visible:ring-slate-950
              disabled:pointer-events-none
              disabled:opacity-50 dark:focus-visible:ring-slate-300
              bg-slate-900 text-slate-50 hover:bg-slate-900/90
              dark:bg-slate-50 dark:text-slate-900
              dark:hover:bg-slate-50/90 h-9 small-medium
              btn-secondary min-h-[41px] w-full rounded-lg
              px-4 py-3 shadow-none
            "
          >
            <Image
              src="/assets/icons/account.svg"
              alt="LogIn"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="primary-text-gradient max-lg:hidden">
              Log In
            </span>
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button
            className="
              inline-flex items-center justify-center
              text-sm font-medium transition-colors
              focus-visible:outline-none focus-visible:ring-1
              focus-visible:ring-slate-950 disabled:pointer-events-none
              disabled:opacity-50 dark:focus-visible:ring-slate-300
              bg-slate-900 hover:bg-slate-900/90 dark:bg-slate-50
              dark:text-slate-900 dark:hover:bg-slate-50/90 h-9
              small-medium light-border-2 btn-tertiary text-dark400_light900
              min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none
            "
          >
            <Image
              src="/assets/icons/sign-up.svg"
              alt="LogIn"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="max-lg:hidden">
              Sign Up
            </span>
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default LeftSidebar

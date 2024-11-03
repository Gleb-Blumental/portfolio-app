import React from 'react'
import { projects } from '@/data'

const RecentProjects = () => {
  return (
    <div className="py-20">
        <h1 className="heading">
            A small selection of my {''}
            <span className="text-pink-300">recent projects</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
              {projects.map(({ id, title, des, img, iconLists, link }) => (
                  <div key={id} className="lg:min-h-[32.5rem] h-[25rem] flex-item-center justify-normal sm:w-96 w-[80vw]">
                      {title}
                  </div>
              ))}

        </div>
    </div>
  )
}

export default RecentProjects
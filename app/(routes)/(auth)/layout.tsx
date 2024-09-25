import React, { PropsWithChildren } from 'react'
import { BsFillTrainFreightFrontFill } from 'react-icons/bs'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center gap-y-8 p-4 py-12">
      <div className="flex items-center justify-center space-x-2">
        <BsFillTrainFreightFrontFill className="h-10 w-10 fill-primary" />
        <p className="select-none text-3xl font-bold">
          <span className="text-primary">Rail</span>
          <span className="text-gray-9">Hub</span>
        </p>
      </div>
      {children}
    </main>
  )
}

export default Layout

import React from 'react'

export default function Widget() {
  return (
      <body className="bg-zinc-100 font-sans leading-normal tracking-normal">
          <div className="flex h-screen">
              
              <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
                  <a href="#" className="text-blue-500 font-semibold text-xl tracking-tight">Dashboard</a>
                  <nav>
                      <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">Dashboard</a>
                      <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">Calendar</a>
                      <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">History</a>
                      <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">Profile</a>
                  </nav>
              </div>
      
              
              <div className="flex-1 flex flex-col overflow-hidden">
                  <header className="flex justify-between items-center p-6">
                      <div className="flex items-center space-x-4">
                          <span className="text-zinc-500">Hi, Welcome Back</span>
                          <span className="font-semibold">Rikhil Taneja</span>
                      </div>
                      <div className="flex items-center space-x-4">
                          <img src="https://placehold.co/40x40" alt="Profile" className="rounded-full"/>
                      </div>
                  </header>
      
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-100">
                      <div className="container mx-auto px-6 py-8">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              
                              <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                                  <div className="flex items-center space-x-6 mb-4">
                                      <div className="flex-1">
                                          <h3 className="text-lg font-semibold text-zinc-700">Book Your Health Hassle Free</h3>
                                      </div>
                                      <img src="https://placehold.co/100x100" alt="Doctor" className="w-24 h-24 rounded-full"/>
                                  </div>
                                  <button className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600">View All Doctors</button>
                              </div>
      
                              
                              <div className="bg-white rounded-lg shadow p-6">
                                  <h3 className="text-lg font-semibold text-zinc-700 mb-4">Your Token No.</h3>
                                  <div className="text-center">
                                      <span className="text-3xl font-semibold text-blue-500">24</span>
                                  </div>
                              </div>
                          </div>
      
                          
                          <div className="mt-8">
                              <h3 className="text-zinc-700 text-2xl font-medium">Doctors</h3>
                              <span className="mt-3 text-sm text-zinc-500">Nearest Doctors</span>
                              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  <div className="bg-white rounded-lg shadow p-4">
                                      <div className="flex items-center space-x-4">
                                          <img src="https://placehold.co/100x100" alt="Dr. AK Singh" className="w-14 h-14 rounded-full"/>
                                          <div className="flex-1">
                                              <h4 className="text-lg font-semibold">Dr. AK Singh</h4>
                                              <p className="text-sm text-zinc-500">Ophthalmologist, AIIMS Delhi</p>
                                          </div>
                                      </div>
                                      <p className="mt-3 text-sm text-zinc-500">Lorem ipsum dolor sit amet consectetur.</p>
                                      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </main>
              </div>
          </div>
      </body>
      
  )
}


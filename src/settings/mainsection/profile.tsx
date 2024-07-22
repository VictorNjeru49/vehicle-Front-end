

function ProfileUser() {
  return (
    <div>
        
        <div className="lg:col-span-9">
          <div className="py-6 px-4 sm:p-6 lg:pb-8">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">Profile</h2>
              <p className="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you
                share.</p>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row">
              <div className="flex-grow space-y-6">
                <div className="col-span-3 sm:col-span-2">
                  <label id="company-website" className="block text-sm font-medium text-gray-700">Username</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span
                      className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">workcation.com/</span>
                    <input type="text" name="company-website" id="company-website" autoComplete="company-website"
                      className="flex-1 min-w-0 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <label id="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input type="text" name="email-address" id="email-address" autoComplete="email"
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                </div>
              </div>

              <div className="mt-6 flex-shrink-0">
                <div className="relative">
                  <img className="h-20 w-20 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixqx=on8U4hX&ixid=MnwyMDUwOTR8MHwxfGFsbHwxfHx8fHx8fHwxNjQ4NjQ0NDQ1&auto=format&fit=crop&w=80&q=80"
                    alt=""/>
                  <button type="button"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-medium rounded-full">
                    <span className="sr-only">Change avatar</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label id="about" className="block text-sm font-medium text-gray-700">About</label>
              <div className="mt-1">
                <textarea id="about" name="about" rows={3}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
              </div>
              <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
            </div>
          </div>

          <div className="py-4 px-4 flex justify-end sm:px-6">
            <button type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Cancel
            </button>
            <button type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Save
            </button>
          </div>
        </div>
    </div>
  )
}

export default ProfileUser
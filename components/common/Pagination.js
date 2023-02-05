const Pagination = ({ totalProducts, productsPerPage, currentPage, setCurrentPage, children }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  const pageButtonCount = 5

  const prevButton = (
    <button
      className='text-white border-transparent bg-cyan-700 btn btn-xs'
      disabled={currentPage === 0}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Prev
    </button>
  )

  const nextButton = (
    <button
      className='text-white border-transparent bg-cyan-700 btn btn-xs'
      disabled={currentPage === totalPages - 1}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next
    </button>
  )

  const start = Math.max(0, currentPage - Math.floor(pageButtonCount / 2))
  const end = Math.min(totalPages, start + pageButtonCount)

  const pageButtons = []
  for (let i = start; i < end; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`text-white bg-cyan-600 border-transparent btn btn-xs ${currentPage === i ? 'bg-cyan-900 btn-disabled' : ''}`}
        onClick={() => setCurrentPage(i)}
      >
        {i + 1}
      </button>
    )
  }

  if (start > 0) {
    pageButtons.unshift(
      <button key={-1} className='text-cyan-600 btn btn-disabled btn-xs'>
        ...
      </button>
    )
  }

  if (end < totalPages) {
    pageButtons.push(
      <button key={totalPages} className='text-cyan-600 btn btn-disabled btn-xs'>
        ...
      </button>
    )
  }

  return (
    <div className='flex flex-col mt-6'>
      <div className='justify-center md:justify-end btn-group'>
        {prevButton}
        {pageButtons}
        {nextButton}
      </div>
      {children}
      <div className='justify-center mt-10 btn-group sm:hidden'>
        {prevButton}
        {pageButtons}
        {nextButton}
      </div>
    </div>
  )
}

export default Pagination

import Pagination from 'react-bootstrap/Pagination';

function Paginations({ pageNumber, pageSize, totalNumberOfPages, totalNumberOfRecords, getNewPage }) {
  console.log(pageNumber, pageSize, totalNumberOfPages, totalNumberOfRecords);

  if (totalNumberOfPages <= 1) return null; 

  const data = Array.from({ length: totalNumberOfPages }, (_, i) => i + 1)
    .slice(1, -1) // Remove first and last item
    .slice(0, 5); // Ensure only 5 items are displayed

  return (
    <div className='pagination d-flex justify-content-center'>
      <Pagination>
        <Pagination.First onClick={() => getNewPage(1)} disabled={pageNumber === 1} />
        <Pagination.Prev onClick={() => getNewPage(pageNumber - 1)} disabled={pageNumber === 1} />
        <Pagination.Item active={pageNumber === 1} onClick={() => getNewPage(1)}>
          {1}
        </Pagination.Item>
        {totalNumberOfPages <= 2?null:<Pagination.Ellipsis disabled />}

        {data.map((item) => (
          <Pagination.Item 
            key={item} 
            active={item === pageNumber} 
            onClick={() => getNewPage(item)}
          >
            {item}
          </Pagination.Item>
        ))}

    {totalNumberOfPages <= 2?null:<Pagination.Ellipsis disabled />}
        <Pagination.Item active={pageNumber === totalNumberOfPages} onClick={() => getNewPage(totalNumberOfPages)}>
          {totalNumberOfPages}
        </Pagination.Item>
        <Pagination.Next onClick={() => getNewPage(pageNumber + 1)} disabled={pageNumber === totalNumberOfPages} />
        <Pagination.Last onClick={() => getNewPage(totalNumberOfPages)} disabled={pageNumber === totalNumberOfPages} />
      </Pagination>
    </div>
  );
}

export default Paginations;

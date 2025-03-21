import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

function Paginations({ pageNumber, totalNumberOfPages, getNewPage }) {
  if (totalNumberOfPages <= 1) return null;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxVisiblePages = isMobile ? 3 : 5;
  let startPage = Math.max(2, pageNumber - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalNumberOfPages - 1, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(2, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="pagination d-flex justify-content-center flex-wrap">
      <Pagination>
        <Pagination.First onClick={() => getNewPage(1)} disabled={pageNumber === 1} />
        <Pagination.Prev onClick={() => getNewPage(pageNumber - 1)} disabled={pageNumber === 1} />

        <Pagination.Item active={pageNumber === 1} onClick={() => getNewPage(1)}>
          1
        </Pagination.Item>

        {!isMobile && startPage > 2 && <Pagination.Ellipsis disabled />}

        {pageNumbers.map((item) => (
          <Pagination.Item key={item} active={item === pageNumber} onClick={() => getNewPage(item)}>
            {item}
          </Pagination.Item>
        ))}

        {!isMobile && endPage < totalNumberOfPages - 1 && <Pagination.Ellipsis disabled />}

        {totalNumberOfPages > 1 && (
          <Pagination.Item active={pageNumber === totalNumberOfPages} onClick={() => getNewPage(totalNumberOfPages)}>
            {totalNumberOfPages}
          </Pagination.Item>
        )}

        <Pagination.Next onClick={() => getNewPage(pageNumber + 1)} disabled={pageNumber === totalNumberOfPages} />
        <Pagination.Last onClick={() => getNewPage(totalNumberOfPages)} disabled={pageNumber === totalNumberOfPages} />
      </Pagination>
    </div>
  );
}

export default Paginations;

// import { Document, Page } from 'react-pdf';
import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { ImgUrl, ImgUrl2 } from '../Urls';

const PdfReader = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [url] = useSearchParams()
  const link = decodeURI(url.get("link"))
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    // <div>
    //   <div>
    //   {`${ImgUrl2}${link}`}
    //     </div>
    //   <Document file={`${ImgUrl2}${link}`} onLoadSuccess={onDocumentLoadSuccess}>
    //     <Page pageNumber={pageNumber} />
    //   </Document>
    //   <p>
    //     Page {pageNumber} of {numPages}
    //   </p>
    // </div>
<></>
  )
}

export default PdfReader
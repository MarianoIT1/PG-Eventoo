import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Style from './ModalVoucher.module.css'
import { API } from '../../../App';
import { axiosPutTicket, axiosCANCELTicket, axiosGetTicket } from '../../../Slice/transaction/TransactionSlice';
import { Document, Page } from 'react-pdf'
import pdfjsLib from 'pdfjs-dist'
import Modal from '../Modal';



const ModalVoucher = ({ setShowModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(false)
  const [fileIsFetching, setfileIsFetching] = useState(false)
  const [urlFile, seturlFile] = useState(null)
  const [imgDocument, setImgDocument] = useState(null)
  const [pdfDocument, setPdfDocument] = useState(null)
  const [accepted, setAccepted] = useState(true);
  const refInputImg = useRef()
  const { email } = useSelector(state => state.user)
  const { eventDetail } = useSelector(state => state.eventDetail)
  const { transaction } = useSelector(state => state.transaction)
  const [id, setId] = useState(null)


  useEffect(() => {
    dispatch(axiosGetTicket(eventDetail.id))
  }, []);

  useEffect(() => {
    transaction?.map(i => {
      if (i.status === 'PENDING') {
        setId(i.id)
      }
    })
  }, [transaction])



  //useEffect que instanciar el urlFile, para hacer un PUT en el handle
  useEffect(() => {
    if (pdfDocument) {
      // const url = pdfDocument.replace("view", "download");
      seturlFile(pdfDocument)
    } else if (imgDocument) {
      seturlFile(imgDocument)
    }
  }, [pdfDocument, imgDocument])


  //handle que realiza el dispatch, de la url
  const handleAccept = () => {
    const objUrlFile = {
      payment_proof: urlFile
    }
    dispatch(axiosPutTicket({ id, objUrlFile }))
  };



  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && (e.dataTransfer.files[0].type.startsWith('image/') || e.dataTransfer.files[0].type.startsWith('application/pdf'))) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFiles = (file) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      var rawLog = reader.result.split(',')[1];
      var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" };//preapre info to send to API

      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file))
        setfileIsFetching(true)
        fetch('https://script.google.com/macros/s/AKfycbxU47iTlWQkocTIWS_Wr_fO_U7zqLuQE3jF7QTMeChKn-d2KrNdOLrCsFerZeS50W_2Ow/exec', //your AppsScript URL
          { method: "POST", body: JSON.stringify(dataSend) })
          .then(res => res.json()).then(res => {
            setImgDocument(res.url)
            setfileIsFetching(false)
            setAccepted(!accepted);
          }).catch(e => console.log(e))
      } else if (file.type.startsWith('application/pdf')) {
        setPreview(URL.createObjectURL(file))
        setfileIsFetching(true)
        fetch('https://script.google.com/macros/s/AKfycbxU47iTlWQkocTIWS_Wr_fO_U7zqLuQE3jF7QTMeChKn-d2KrNdOLrCsFerZeS50W_2Ow/exec', //your AppsScript URL
          { method: "POST", body: JSON.stringify(dataSend), })
          .then(res => res.json()).then(res => {
            setPdfDocument(res.url)
            setfileIsFetching(false)
            setAccepted(!accepted);
          }).catch(e => console.log(e))
      }
    }
  }

  const handleDelete = () => {
    dispatch(axiosCANCELTicket(id))
    navigate(0)
  }

  console.log(pdfDocument,'soy la url del pdf')

  return (
    <Modal width={'1100px'} setShowModal={setShowModal}>
      {transaction &&
        <div onDragEnter={handleDrag} className={Style.imageWrapper}>

          <h1 className={Style.containerVoucher_tittle}>Operacion de pedido <p>{id?.slice(0, 8)}</p></h1>
          <h2 className={Style.containerVoucher_subTittle}><p>del usuario</p> {email}</h2>

          {
            !preview
              ?
              <div className={Style.containerVoucher}>
                <input
                  hidden
                  id="imgInput"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  ref={refInputImg}
                  onChange={(e) => handleFiles(e.target.files[0])}
                />
                <label className={Style.imgDropArea} htmlFor="imgInput">
                  {!dragActive
                    ? <div className={Style.defaultDropArea}>
                      <p>Drag and drop a PDF here</p>
                      <p>or</p>
                      <button
                        type='button'
                        className={Style.uploadButton}
                        onClick={() => refInputImg.current.click()}
                      >
                        Upload a PDF
                      </button>
                    </div>
                    : <div className={Style.onDragDropArea}>
                      Drop your PDF here
                    </div>
                  }
                </label>
              </div>

              : fileIsFetching
                ?
                <div className={Style.uploadMsg}>
                  <h2>Cargando comprobante</h2>
                  <h3>Aguarde por favor</h3>
                  <div className={Style.spinner}><div></div><div></div><div></div><div></div></div>
                </div>

                : imgDocument
                  ?
                  <div className={Style.imgPreviewWrappper}>
                    <img className={Style.imgPreview} style={{ backgroundImage: `url(${preview})` }} />
                  </div>
                  :
                  <div className={Style.imgPreviewWrappper}>
                    <embed src={`${pdfDocument}`} type='application/pdf'/>
                  </div>
          }

          <div className={Style.containerVoucher_button}>
            <button
              type='button'
              className={'btnprimario'}
              onClick={handleDelete}>
              CANCELAR
            </button>

            <button
              type='button'
              className={accepted ? Style.btnAceptar : 'btnprimario'}
              disabled={accepted}
              onClick={handleAccept}>
              ACEPTAR
            </button>
          </div>
          {dragActive && <div className={Style.dragImgElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </div>}
    </Modal>
  )
}

export default ModalVoucher



  // useEffect(()=>{
  //   if(pdfDocument){
  //     pdfjsLib.getDocument(pdfDocument).promise
  //     .then(function(pdf){
  //       pdf.getPage(1)
  //       .then(function(page){
  //         const viewport= page.getViewport({scale:1});
  //         const canvas = canvasRef.current;
  //         const context= canvas.getContext('2d');
  //         canvas.width=viewport.width;
  //         canvas.height=viewport.height;
  //         const renderContext={
  //           canvasContext: context,
  //           viewport: viewport
  //         }
  //         page.render(renderContext)
  //       })
  //     })
  //   }
  // },[pdfDocument])
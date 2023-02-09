import React, {useState} from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateGuestsCapacity, updateIsPaid, updateIsPublic } from '../../../Slice/CreateEvent/CreateEvent';
import ButtonGroup from '../Category/ButtonGroup';
import style  from './Tickets.module.css'



function Tickets({input,setInput,errors, showMsg, setShowMsg}) {
  const dispatch = useDispatch();
  const [isPublic, setIsPublic] = useState(null);
  const [isPaid, setIsPaid] = useState(null);

  useEffect(() => {
    
  }, [isPublic]);

const handleBlur = (e) =>{
    setShowMsg({
        ...showMsg,
        [e.target.name]: true,
    })
}

  const handleClick = e => {
    e.preventDefault();
    setIsPublic(true);
    dispatch(updateIsPublic(true));
    setInput({
      ...input,
      [e.target.name]: e.target.value
  })
    console.log('public', isPublic);
  }

  const handle2Click = e => {
    e.preventDefault();
    setIsPublic(false);
    dispatch(updateIsPublic(false));
    setInput({
      ...input,
      [e.target.name]: e.target.value
  })
    console.log('public', isPublic);
  }

  const handlePaid = e => {
    e.preventDefault();
    setIsPaid(true);
    dispatch(updateIsPaid(true));
    setInput({
      ...input,
      [e.target.name]: e.target.value
  })
  }

  const handle2Paid = e => {
    e.preventDefault();
    setIsPaid(false);
    dispatch(updateIsPaid(false));
    setInput({
      ...input,
      [e.target.name]: e.target.value
  })
  }

  const handleChange = e =>{
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
  })
  }

  const handleGroupPrice = (e) => {
    setInput({
      ...input,
      isPaid: e.target.name === 'Paid',
    });
  };

  const handleGroupPublic = (e) => {
    setInput({
      ...input,
      isPublic: e.target.name === 'Public',
    });
  };

  return (
    <div className={style.container}>
        <h1 className={style.title}>Tickets</h1>
        <p className={style.text}>
          Please choose if the event will be public or private.
        </p>
        <ButtonGroup
          buttons={["Public", "Private"]}
          handleGroup={handleGroupPublic}
        />
        {/* <div className={style.options}>
            <button
            style={isPublic === true?  { opacity: 1}: { opacity: 0.5 }}
            onClick={handleClick}
            value={true}
            className={style.btn}
            name='isPublic'
            onBlur={handleBlur}
            >
            Public
            </button>
            <button
            style={isPublic === false? { opacity: 1}: { opacity: 0.5 }}
            onClick={handle2Click}
            value={false}
            className={style.btn}
            name='isPublic'
            onBlur={handleBlur}
            >
            Private
            </button>
        </div> */}
        {showMsg.isPublic&&(
                            <p className={style.warning}>{errors.isPublic}</p>
                        )}
        <p className={style.text}>
          Choose if you wanna pay an extra for more guests or publicity.
        </p>
        <ButtonGroup
          buttons={["Paid", "Free"]}
          handleGroup={handleGroupPrice}
        />
        {/* <div className={style.options}>
            <button
            style={isPaid === true?  { opacity: 1}: { opacity: 0.5 }}
            onClick={handlePaid}
            value='true'
            className={style.btn}
            >
            Paid
            </button>
            <button
            style={ isPaid === false? { opacity: 1}: { opacity: 0.5 }}
            onClick={handle2Paid}
            value='false'
            className={style.btn}
            >
            Free
            </button>
        </div> */}
        <h4 className={style.parr}>Capacity:</h4>
        <input
        placeholder='Capacity'
        className={style.inputs}
        name ='guests_capacity'
        value={input.guests_capacity}
        onChange={handleChange}
        onBlur={handleBlur}
        style={ showMsg.guests_capacity && errors.guests_capacity ? {border:'red 1px solid'}: {}}/>
        {showMsg.guests_capacity&&(
                            <p className={style.warning}>{errors.guests_capacity}</p>
                        )}
        <h4 className={style.parr}>Price:</h4>
        <input
        placeholder='Price'
        className={style.inputs}
        name ='price'
        value={input.price}
        onChange={handleChange}
        onBlur={handleBlur}
        style={ showMsg.price && errors.price ? {border:'red 1px solid'}: {}}/>
        {showMsg.price&&(
                            <p className={style.warning}>{errors.price}</p>
                        )}
    </div>
  )
}

export default Tickets;
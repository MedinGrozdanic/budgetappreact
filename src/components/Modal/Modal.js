import './modal.css'

export const Modal = ({open, children}) => {



    if(!open) return <></>
    return <div className='my-modal'>
        <div className='my-modal-content'>
        {children}
        </div>
        
    </div>
}
import React, { useContext, useState } from 'react'
import { MessageContext } from '../../context/MessageContext.js'
import { UserContext } from '../../context/UserContext.js'
import { AuthContext } from '../../context/AuthContext.js'




const Users = () => {
    const { value } = useContext(AuthContext)
    const { value1 } = useContext(UserContext)
    const { value2 } = useContext(MessageContext)
    const [activeclass, setActiveclass] = useState(null)
    const [search, setSearch] = useState('')

    const checkProfile = (uid, firstName, surName, eMail) => {
        const awayprofile = {
            uid: uid,
            firstName: firstName,
            surName: surName,
            eMail: eMail
        }
        setActiveclass(uid);
        value2.awayUser(awayprofile)






    }

    return (
        <>

            <div className="headind_srch" >
                <div className="recent_heading">
                    <h4>{value.user ? value.user.displayName : 'Recent'}</h4>
                </div>
                <div className="srch_bar">
                    <div className="stylish-input-group">
                        <input type="text" onChange={(e) => setSearch(e.target.value.toLowerCase())} className="search-bar" placeholder="Search" />
                        <span className="input-group-addon">
                            <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                        </span>
                    </div>
                </div>
            </div>

            <div className="inbox_chat" >

                {value1.Loading ?

                    <div /> :
                    value1.users.filter(x => x.firstName.toLowerCase().indexOf(search) > -1).map((users) => {
                        const {
                            firstName,
                            surName,
                            uid,
                            createdAt,
                            eMail,
                            isOnline

                        } = users

                        const time = new Date(createdAt.seconds * 1000);
                        const humantime = time.toLocaleString()
                        return (
                            <React.Fragment key={uid}>

                                <div onClick={() => checkProfile(uid, firstName, surName, eMail)}
                                    className={activeclass === uid ? 'chat_list active_chat' : 'chat_list'} >
                                    <div className="chat_people "   >

                                        <div className="chat_img"  >
                                            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                                        </div>

                                        <div className="chat_ib"   >

                                            <h5  >{firstName} {surName} <span className="chat_date">{humantime}</span></h5>
                                            <p >{isOnline ? 'online' : 'offline'}</p>

                                        </div>

                                    </div>
                                </div>


                            </React.Fragment>
                        )
                    })
                }


            </div>


        </>
    )
}

export default Users

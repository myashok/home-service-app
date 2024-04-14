import { request, gql } from 'graphql-request'
const MASTER_URL = 'https://api-ap-south-1.hygraph.com/v2/cluxmttnb0cyc07wb3lnwuz23/master';
export const getSlider = async () => {
    const query = gql`
        query Sliders {
            sliders {
            name
            image {
                url
            }
            }
        }     
    `
    return await request(MASTER_URL, query)
};

export const getCategory = async () => {
    const query = gql`
        query q {
            categories {
            name
            icon {
                url
            }
            }
        }
    `
    return await request(MASTER_URL, query)
};


export const getBuisness = async () => {
    const query = gql`
        query q {
            businessLists {
            id
            image {
                url
            }
            email
            about
            category {
                name
            }
            name
            personContact
            }
        }
      
    `
    return await request(MASTER_URL, query)
};

export const getBuisnessByCategory = async (category) => {
    const query = gql`
        query q {
            businessLists(where: {category: {name: "`+category+`"}}) {
            id
            image {
                url
            }
            email
            address
            about
            category {
                name
            }
            name
            personContact
            }
        }

    `
    return await request(MASTER_URL, query)
};

export const createBooking = async (data) => {
    const query = gql`
    mutation m($id: ID, $date: String, $note: String, $time: String, $userEmail: String, $userName: String) {
        createBooking(
          data: {businessList: {
           connect: {id: $id}},
           date: $date, 
           note: $note, 
           time: $time, 
           userEmail: $userEmail, 
           userName: $userName, 
           bookingStatus: Booked
        }
        ) {
          id
        }
        publishManyBookings(to: PUBLISHED) {
            count
        }
      }
    `
    const variables = {
        id: data.id,
        date: data.date,
        time: data.time,
        note: data.note,
        userEmail: data.userEmail,
        userName: data.userName
    }
    return await request(MASTER_URL, query, variables)
};

export const getBookingByUserEmail = async (email) => {
    const query = gql`
        query q($email: String) {
            bookings(where: {userEmail: $email}) {
            bookingStatus
            date
            time
            businessList {
                name
                about
                image {
                url
                }
                category {
                    name
                }
                personContact
                address
            }
            }
        }
      
    `
    const variables = {
        email: email
    }
    return await request(MASTER_URL, query, variables)
};
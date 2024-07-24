import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BookingState, LoginRequest, PaymentForm, RegisterRequest, TAvailabilityVehicle, TFleet, Tickets, TLocations, TReveiws, TSearch, TUser, TVehicle, TVehicleSpec} from "../../types/alltypes";
import { RootState } from "../../app/store";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-qp3a.onrender.com",
    prepareHeaders: (headers)=>{
      const token = localStorage.getItem('authToken');
      if(token){
        headers.set('Authorization', `${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["getUsers"],

  endpoints: (builder) => ({


    GetUserProfile: builder.query<TUser[], void>({
      query: () => "users",
      providesTags: ["getUsers"],
    }),


      GetUserProfileById: builder.query<TSearch, number>({
        query: (id) => ({
          url:`users/${id}`,
        providesTags: ["getUserProfileByIdTag"],
      }),
  
      }),


    CreateUserProfile: builder.mutation<TUser, Partial<TUser>>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
        providesTags: ["createUser"],
      }),
      invalidatesTags: ["getUsers"],
    }),


    updateUserPassword: builder.mutation<void, { id: number; password: string }>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['getUsers'],
    }),



    UpdateUserProfile: builder.mutation<TUser, Partial<TUser>>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: rest,
        providesTags: ["updateUser"],
      }),
      invalidatesTags: ["getUsers"],
    }),


    DeleteUserProfile: builder.mutation<{ success: boolean; userId: number }, number>(
      {
        query: (userId) => ({
          url: `users/${userId}`,
          method: "DELETE",
          providesTags: ["deleteUser"],
        }),
        invalidatesTags: ["getUsers"],
      }
    ),
  }),
});

export const LoginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vehicle-rental-backend-qp3a.onrender.com' }),
  endpoints: (builder) => ({
      loginUser: builder.mutation<LoginRequest, { email: string; password: string }>({
          query: (credentials) => ({
              url: 'login',
              method: 'POST',
              body: credentials,
          }),
      }),
  }),
})

export const RegisterApi = createApi({
    reducerPath: 'RegisterApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://vehicle-rental-backend-qp3a.onrender.com' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<RegisterRequest, { email: string; password: string; }>({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials,
            }),
        }),
        loginUser: builder.mutation<LoginRequest, { email: string; password: string;}>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const VehicleApi = createApi({
  reducerPath: 'VehicleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-qp3a.onrender.com"
  }),
  tagTypes: ["getVehicle"],

  endpoints: (builder) => ({

    GetVehicle: builder.query<TVehicle[], void>({
      query: () => "vehicles",
      providesTags: ["getVehicle"],
    }),
      GetVehicleById: builder.query<TVehicle, number>({
        query: (id) => ({
          url:`vehicles/${id}`,
        providesTags: ["getVehicleProfileByIdTag"],
      }),
  
      }),
      createVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
        query: (newVehicle) => ({
          url: "vehicles",
          method: "POST",
          body: newVehicle,
        }),
        invalidatesTags: ["getVehicle"],
      }),
  
      // Create Vehicle Specification
      createVehicleSpecification: builder.mutation<TVehicleSpec, Partial<TVehicleSpec>>({
        query: (newSpec) => ({
          url: "vehicleSpec",
          method: "POST",
          body: newSpec,
        }),
        invalidatesTags: ["getVehicle"],

      }),

    CreateVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
      query: (newVehicle) => ({
        url: "vehicles",
        method: "POST",
        body: newVehicle,
        providesTags: ["createVehicle"],
      }),
      invalidatesTags: ["getVehicle"],
    }),

    UpdateVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
      query: ({ id, ...rest }) => ({
        url: `vehicles/${id}`,
        method: "PUT",
        body: rest,
        providesTags: ["updateVehicle"],
      }),
      invalidatesTags: ["getVehicle"],
    }),


    DeleteVehicle: builder.mutation<{ success: boolean; VehicleId: number }, number>(
      {
        query: (id) => ({
          url: `vehicles/${id}`,
          method: "DELETE",
          providesTags: ["deleteUser"],
        }),
        invalidatesTags: ["getVehicle"],
      }
    ),
  }),
});

export const PaymentApi = createApi({
  reducerPath:'PaymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-rental-backend-qp3a.onrender.com'
  }),
  tagTypes: ["getPayments"],
  endpoints:(builder) => ({
      // get Payment profile

      GetPayment: builder.query<PaymentForm[], void>({
          query: () => 'payment',
          providesTags:['getPayments']
          
              // ({url: '/Payment',}),
          // transformResponse: (response) => response.data,
      }),


          // get Payment profile by ID
          GetPaymentById: builder.query<PaymentForm, number>({
              query: (id) =>
                ({url: `payment/${id}`,
              providesTags: ["getPaymentsById"]})
            }),


      // update Payment profile
      UpdatePayment: builder.mutation<PaymentForm, Partial<PaymentForm>>({
          query: ({id, ...rest}) => ({
              url:`payment/${id}`,
              method: "PUT",
              body: rest,
              providesTags: ['updatePayment'],
          }),
          invalidatesTags: ['getPayments'],
      }),

      // delete Payment profile
      DeletePayment: builder.mutation<number, number>({
          query: (id) => ({
              url: `payment/${id}`,
              method: 'DELETE',
          }),
          invalidatesTags: ['getPayments'],
      }),
      
      // create Payment profile
      CreatePayment: builder.mutation<PaymentForm, Partial<PaymentForm>>({
          query: (newusers) => ({
              url: 'payment',
              method: 'POST',
              body: newusers,
              provideTags: ['CreatePayment']
          }),
          invalidatesTags: ['getPayments'],
      })
  }),
})

export const AvailableVehicleApi = createApi({
  reducerPath: "AvailableVehicleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-qp3a.onrender.com",
  }),
  tagTypes: ["available Vehicle"],

  endpoints: (builder) => ({
    GetAvailableVehicle: builder.query<TAvailabilityVehicle[], void>({
      query: () => "availability",
      providesTags: ["available Vehicle"],
    }),
      GetAvailableVehicleById: builder.query<TAvailabilityVehicle, number>({
        query: (id) => ({
          url:`availability/${id}`,
        providesTags: ["getavailable VehicleByIdTag"],
      }),
  
      }),
    CreateAvailableVehicle: builder.mutation<TAvailabilityVehicle, Partial<TAvailabilityVehicle>>({
      query: (newUser) => ({
        url: "availability",
        method: "POST",
        body: newUser,
        providesTags: ["createUser"],
      }),
      invalidatesTags: ["available Vehicle"],
    }),
    UpdateAvailableVehicle: builder.mutation<TAvailabilityVehicle, Partial<TAvailabilityVehicle>>({
      query: ({ id, ...rest }) => ({
        url: `availability/${id}`,
        method: "PUT",
        body: rest,
        providesTags: ["updateUser"],
      }),
      invalidatesTags: ["available Vehicle"],
    }),
    DeleteAvailableVehicle: builder.mutation<{ success: boolean; id: number }, number>(
      {
        query: (userId) => ({
          url: `availability/${userId}`,
          method: "DELETE",
          providesTags: ["deleteUser"],
        }),
        invalidatesTags: ["available Vehicle"],
      }
    ),
  }),
});

export const BookingApi = createApi({
  reducerPath:'BookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-rental-backend-qp3a.onrender.com'
  }),
  tagTypes: ["getBooking"],
  endpoints:(builder) => ({
      // get Booking profile

      GetBooking: builder.query<BookingState[], void>({
          query: () => 'bookService',
          providesTags:['getBooking']
          
              // ({url: '/Booking',}),
          // transformResponse: (response) => response.data,
      }),


          // get Booking profile by ID
          GetBookingById: builder.query<BookingState, number>({
              query: (id) =>
                ({url: `bookService/${id}`,
              providesTags: ["getBookingById"]})
            }),


      // update Booking profile
      UpdateBooking: builder.mutation<BookingState, Partial<BookingState>>({
          query: ({id, ...rest}) => ({
              url:`bookService/${id}`,
              method: "PUT",
              body: rest,
              providesTags: ['updateBooking'],
          }),
          invalidatesTags: ['getBooking'],
      }),

      // delete Booking profile
      DeleteBooking: builder.mutation<number, number>({
          query: (id) => ({
              url: `bookService/${id}`,
              method: 'DELETE',
          }),
          invalidatesTags: ['getBooking'],
      }),
      
      // create Booking profile
      CreateBooking: builder.mutation<BookingState, Partial<BookingState>>({
          query: (newusers) => ({
              url: 'bookService',
              method: 'POST',
              body: newusers,
              provideTags: ['CreateBooking']
          }),
          invalidatesTags: ['getBooking'],
      })
  }),
})

export const VehicleSpecificationApi = createApi({
  reducerPath: "vehicleSpecificationApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vehicle-rental-backend-qp3a.onrender.com' }),
  tagTypes: ["VehicleSpecification"],
  endpoints: (builder) => ({

    GetVehicleSpec: builder.query({
      query: () => "vehicleSpec",
      providesTags: ["VehicleSpecification"],
    }),

    GetVehicleSpecificationsById: builder.query({
      query: (id) => `vehicleSpec/${id}`,
      providesTags: ['VehicleSpecification'],
    }),

      UpdateVehicleSpecification: builder.mutation<TVehicleSpec, Partial<TVehicleSpec>>({
          query: ({ id, ...rest }) => ({
              url: `vehicleSpec/${id}`,
              method: 'PUT',
              body: rest,
          }),
          invalidatesTags: ['VehicleSpecification'],
      }),

      DeleteVehicleSpecification: builder.mutation<{sucess: boolean; spec: number}, number>(
        {
          query:(id)=>({
            url: `VehicleSpec/${id}`,
            method: "DELETE",
            providesTags:["VehicleSpecification"]
          }),
          invalidatesTags: ["VehicleSpecification"]
        }
      )
  }),

      
})

export const FleetManagmentApi = createApi({
  reducerPath:'FleetManagmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-rental-backend-qp3a.onrender.com'
  }),
  tagTypes: ["fleetManagmentService"],
  endpoints:(builder) => ({

   GetFleetManagement: builder.query<TFleet[], void>({
      query: () => "fleetManagment",
      providesTags: ["fleetManagmentService"],
    }),


GetFleetManagmentById: builder.query<TFleet, number>({
    query: (id) => ({
      url:`fleetManagment/${id}`,
    providesTags: ["getUserProfileByIdTag"],
  }),
}),
CreateFleetManagment: builder.mutation<TFleet, Partial<TFleet>>({
  query: (newUser) => ({
    url: "fleetManagment",
    method: "POST",
    body: newUser,
    providesTags: ["createUser"],
  }),
  invalidatesTags: ["fleetManagmentService"],
}),

UpdateFleetManagment: builder.mutation<TFleet, Partial<TFleet>>({
  query: ({ id, ...rest }) => ({
    url: `fleetManagment/${id}`,
    method: "PUT",
    body: rest,
    providesTags: ["updateUser"],
  }),
  invalidatesTags: ["fleetManagmentService"],
}),


DeleteFleetManagment: builder.mutation<{ success: boolean; fleetid: number }, number>(
  {
    query: (userId) => ({
      url: `fleetManagment/${userId}`,
      method: "DELETE",
      providesTags: ["deleteUser"],
    }),
    invalidatesTags: ["fleetManagmentService"],
  }
),
})})

export const ReviewsApi = createApi({
  reducerPath:'ReviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-rental-backend-qp3a.onrender.com'
  }),
  tagTypes: ["ReviewService"],
  endpoints:(builder) => ({
    
    GetReviews: builder.query<TReveiws[], void>({
      query: () =>"review",
      providesTags: ['ReviewService']
    }),

GetReviewsById: builder.query<TReveiws, number>({
    query: (id) => ({
      url:`review/${id}`,
    providesTags: ["getUserProfileByIdTag"],
  }),
}),
CreateReviews: builder.mutation<TReveiws, Partial<TReveiws>>({
  query: (newReview) => ({
    url: "review",
    method: "POST",
    body: newReview,
    providesTags: ["createUser"],
  }),
  invalidatesTags: ["ReviewService"],
}),

UpdateReviews: builder.mutation<TReveiws, Partial<TReveiws>>({
  query: ({ id, ...rest }) => ({
    url: `review/${id}`,
    method: "PUT",
    body: rest,
    providesTags: ["updateUser"],
  }),
  invalidatesTags: ["ReviewService"],
}),


DeleteReviews: builder.mutation<{ success: boolean; userId: number }, number>(
  {
    query: (userId) => ({
      url: `review/${userId}`,
      method: "DELETE",
      providesTags: ["deleteUser"],
    }),
    invalidatesTags: ["ReviewService"],
  }
),
})})

export const LocationApi = createApi({
  reducerPath:'LocationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-rental-backend-qp3a.onrender.com'
  }),
  tagTypes: ["getLocations"],
  endpoints:(builder) => ({
      // get Locations profile

      GetLocations: builder.query<TLocations[], void>({
          query: () => 'locations',
          providesTags:['getLocations']
          
              // ({url: '/Locations',}),
          // transformResponse: (response) => response.data,
      }),


          // get Locations profile by ID
          GetLocationsById: builder.query<TLocations, number>({
              query: (id) =>
                ({url: `locations/${id}`,
              providesTags: ["getLocationsById"]})
            }),


      // update Locations profile
      UpdateLocations: builder.mutation<TLocations, Partial<TLocations>>({
          query: ({id, ...rest}) => ({
              url:`locations/${id}`,
              method: "PUT",
              body: rest,
              providesTags: ['updatelocations'],
          }),
          invalidatesTags: ['getLocations'],
      }),

      // delete Locations profile
      DeleteLocations: builder.mutation<number, number>({
          query: (id) => ({
              url: `locations/${id}`,
              method: 'DELETE',
          }),
          invalidatesTags: ['getLocations'],
      }),
      
      // create Locations profile
      CreateLocations: builder.mutation<TLocations, Partial<TLocations>>({
          query: (newusers) => ({
              url: 'locations',
              method: 'POST',
              body: newusers,
              provideTags: ['Createlocations']
          }),
          invalidatesTags: ['getLocations'],
      })
  }),
})

export const TicketsApi = createApi({
  reducerPath: 'TicketsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-rental-backend-qp3a.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["getTickets"],
  endpoints: (builder) => ({
    // Get all tickets
    GetTickets: builder.query<Tickets[], void>({
      query: () => 'customerSupport',
      providesTags: ['getTickets'],
    }),

    // Get ticket by ID
    GetTicketsById: builder.query<Tickets, number>({
      query: (id) => `customerSupport/${id}`,
      providesTags: ["getTickets"],
    }),

    // Update ticket
    UpdateTickets: builder.mutation<Tickets, Partial<Tickets>>({
      query: ({ id, ...rest }) => ({
        url: `customerSupport/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ['getTickets'],
    }),

    // Delete ticket
    DeleteTickets: builder.mutation<number, number>({
      query: (id) => ({
        url: `customerSupport/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getTickets'],
    }),

    // Create ticket
    CreateTickets: builder.mutation<Tickets, Partial<Tickets>>({
      query: (newTicket) => ({
        url: 'customerSupport',
        method: 'POST',
        body: newTicket,
      }),
      invalidatesTags: ['getTickets'],
    }),
  }),
});
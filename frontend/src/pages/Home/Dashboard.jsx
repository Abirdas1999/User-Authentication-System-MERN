// import FloatingShape from "../../Components/Floating/FloatingShape"
import FloatingShape from "../../Components/Floating/FloatingShape"
import MyCalendar from "./Calendar"
import Profile from "./Profile"

function Dashboard() {
    return (
        <div className='min-h-screen bg-gradient-to-bl
        from-emerald-900 via-green-900 to-gray-900 items-center justify-center relative overflow-hidden'>
            <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
            <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
            <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
            <Profile  />
            <MyCalendar/>
        </div>
    )
}

export default Dashboard
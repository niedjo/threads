import PostThread from "@/components/forms/PostThread"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Page = async () => {
    const user = await currentUser()
    const userInfo = await fetchUser(user?.id as string)
    console.log(JSON.stringify(userInfo?._id))
    
    if(!userInfo?.onboarded) redirect('/onboarding');
    return (
        <>
            <h1 className='head-text'>Create Thread</h1>
            <PostThread userId={userInfo?._id.toString()} />
        </>
    )
}

export default Page
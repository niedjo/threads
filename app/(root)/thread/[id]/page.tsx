import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({ params } : { params : { id : string }}) => {
    
    const param = await params

    if (!param.id) return null;
    
    const user = await currentUser()
    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    const thread = await fetchThreadById(param.id);
    if(!userInfo?.onboarded) redirect("/onboarding")
    

    return (
        <section className="relative">
            <div className="">
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comment={thread.children}
                />
            </div>
            <div className="mt-7">
                <Comment  
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className="mt-10">
                {thread.children.map((childItem: any) => (
                    <ThreadCard
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={childItem?.id || ""}
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comment={childItem.children}
                        isComment
                    />
                ))}
            </div>
        </section>
    )
}

export default Page
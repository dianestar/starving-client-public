import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { GET_AUTH } from "../_axios/user";

const Create = () => {
    const router = useRouter();
    const currentUrl = router.asPath;

    const getAuth = async () => {
        const res = await GET_AUTH();

        if (!res) {
        router.push(`/login/?returnUrl=${currentUrl}`);
        }
    }

    useEffect(() => {
        getAuth();
    }, []);
    return (
        <Layout>
            <div>
                레시피 만들기
            </div>
        </Layout>
    );
}

export default Create;
"use client";
import { useTemplateContext } from "@/app/context/TemplateContext";
import { Area, AreaChart, Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const EngagementTrends = () => {

    const { viewsArr, socialClicksArr, projectClicksArr, timeSpentArr } = useTemplateContext();

    const data = viewsArr.map(view => ({
        date: view.date,
        views: view.count,
        projectClicks: projectClicksArr.find(click => click.date === view.date)?.count || 0,
        socialClicks: socialClicksArr.find(click => click.date === view.date)?.count || 0,
        timeSpent: timeSpentArr.find(time => time.date === view.date)?.count || 0,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#8884d8" />
                <Line type="monotone" dataKey="projectClicks" stroke="#82ca9d" />
                <Line type="monotone" dataKey="socialClicks" stroke="#ff7300" />
                <Line type="monotone" dataKey="timeSpent" stroke="#ffc658" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export const ViewsChart = () => {

    const { viewsArr } = useTemplateContext();

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsArr}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" name="Views" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export const ClicksChart = () => {

    const { socialClicksArr, projectClicksArr } = useTemplateContext();

    const combinedData = projectClicksArr.map(click => ({
        date: click.date,
        projectClicks: click.count,
        socialClicks: socialClicksArr.find(social => social.date === click.date)?.count || 0,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={combinedData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="projectClicks" fill="#82ca9d" name="Project Clicks" />
                <Bar dataKey="socialClicks" fill="#ff7300" name="Social Clicks" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export const TimeSpentChart = () => {

    const { timeSpentArr } = useTemplateContext();

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSpentArr}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="count" stroke="#ffc658" fill="#ffc658" name="Time Spent (minutes)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};


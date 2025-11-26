import React, { useEffect, useMemo, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext.jsx";
import { apiClient } from "@/lib/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [resources, setResources] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/authenticate/login");
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const [sessionsRes, resourcesRes, feedbackRes] = await Promise.all([
          apiClient.get("/sessions", {
            params: user?.isCounselor ? { counselor: user._id } : { student: user._id },
          }),
          apiClient.get("/resources"),
          apiClient.get("/feedback"),
        ]);

        setSessions(sessionsRes.data.data || []);
        setResources(resourcesRes.data.data || []);
        setFeedback(feedbackRes.data.data || []);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
        toast.error("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, navigate, user]);

  const upcomingSessions = useMemo(
    () =>
      sessions
        .filter((session) => new Date(session.scheduledTime) > new Date())
        .sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime))
        .slice(0, 5),
    [sessions]
  );

  const sessionChartData = useMemo(() => {
    const grouped = sessions.reduce((acc, session) => {
      const key = new Date(session.scheduledTime).toLocaleDateString();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .slice(-6)
      .map(([date, total]) => ({ date, total }));
  }, [sessions]);

  const feedbackChartData = useMemo(() => {
    const grouped = feedback.reduce((acc, item) => {
      const key = new Date(item.createdAt).toLocaleDateString();
      acc[key] = (acc[key] || 0) + (item.rating || 0);
      return acc;
    }, {});

    return Object.entries(grouped)
      .slice(-6)
      .map(([date, rating]) => ({ date, rating }));
  }, [feedback]);

  return (
    <div className="w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[100vh] max-w-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={20} className="bg-white border-r">
          <div className="flex flex-col h-full">
            <div className="p-5 flex items-center gap-2 border-b">
              <img src={logo} alt="MindEase" />
              <span className="text-xl font-bold text-pink-600">MindEase</span>
            </div>

            <nav className="flex flex-col p-4 gap-4 text-gray-700 font-medium">
              <div className="flex items-center gap-2">Dashboard</div>
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
                onClick={() => navigate("/Booking")}
              >
                Manage Sessions
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
                onClick={() => navigate("/resourcehub")}
              >
                Resources
              </div>
            </nav>

            <div className="mt-auto p-4 text-sm text-gray-500">
              Signed in as <br />
              <span className="font-medium">{user?.username || user?.email}</span>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={80} className="bg-gray-50">
          <div className="flex flex-col h-full px-8 py-6">
            <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Overview of your sessions, resources, and student feedback
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate("/Booking")}
                >
                  Book a session
                </Button>
                <Button variant="default" size="sm" onClick={() => navigate("/resourcehub")}
                >
                  Add Resource
                </Button>
              </div>
            </header>

            {loading ? (
              <div className="flex-1 flex items-center justify-center text-gray-600">
                Loading dashboard data...
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pb-8">
                <section className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Sessions</CardTitle>
                      <CardDescription>All scheduled sessions</CardDescription>
                    </CardHeader>
                    <CardContent className="text-3xl font-semibold">
                      {sessions.length}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming</CardTitle>
                      <CardDescription>Next scheduled meetings</CardDescription>
                    </CardHeader>
                    <CardContent className="text-3xl font-semibold">
                      {upcomingSessions.length}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Resources</CardTitle>
                      <CardDescription>Published learning assets</CardDescription>
                    </CardHeader>
                    <CardContent className="text-3xl font-semibold">
                      {resources.length}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Feedback Entries</CardTitle>
                      <CardDescription>Student reflections</CardDescription>
                    </CardHeader>
                    <CardContent className="text-3xl font-semibold">
                      {feedback.length}
                    </CardContent>
                  </Card>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Sessions per Day</CardTitle>
                        <CardDescription>Recent booking activity</CardDescription>
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <BarChart width={400} height={250} data={sessionChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" fontSize={12} />
                        <Bar dataKey="total" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Feedback Rating Trend</CardTitle>
                      <CardDescription>Sum of ratings by day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LineChart width={400} height={250} data={feedbackChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" fontSize={12} />
                        <Line type="monotone" dataKey="rating" stroke="#f87171" strokeWidth={2} />
                      </LineChart>
                    </CardContent>
                  </Card>
                </section>

                <section className="mt-8 bg-white rounded-lg border">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Upcoming Sessions</h2>
                    <p className="text-sm text-gray-500">
                      Next five scheduled sessions
                    </p>
                  </div>
                  {upcomingSessions.length === 0 ? (
                    <p className="p-4 text-sm text-gray-600">No upcoming sessions found.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead>Counsellor</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingSessions.map((session) => (
                          <TableRow key={session._id}>
                            <TableCell>
                              {new Date(session.scheduledTime).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {session.student?.username || session.student?.email || "-"}
                            </TableCell>
                            <TableCell>
                              {session.counselor?.username || session.counselor?.email || "-"}
                            </TableCell>
                            <TableCell className="capitalize">{session.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </section>

                <section className="mt-8 bg-white rounded-lg border">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Feedback</h2>
                    <p className="text-sm text-gray-500">
                      Latest reflections shared after sessions
                    </p>
                  </div>
                  {feedback.length === 0 ? (
                    <p className="p-4 text-sm text-gray-600">No feedback submitted yet.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Session</TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Comments</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feedback.slice(0, 5).map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              {new Date(item.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {item.session?.student?.username || item.session?.student?.email || "-"}
                            </TableCell>
                            <TableCell>{item.rating}</TableCell>
                            <TableCell className="max-w-md truncate">
                              {item.comments || "—"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </section>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Dashboard;

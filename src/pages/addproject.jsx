import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

import db from "../firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const AddProject = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    title: "",
    description: "",
    techStack: "",
    startDate: "",
    endDate: "",
    status: "",
    priority: "",
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "projects"), project);
      setProject({
        title: "",
        description: "",
        techStack: "",
        startDate: "",
        endDate: "",
        status: "",
        priority: "",
      });
      alert("Project added successfully!");
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

  const filteredProjects = projects.filter((proj) => {
    if (filter === "All") return true;
    if (filter === "Active") return proj.status === "In Progress";
    if (filter === "Completed") return proj.status === "Completed";
    return false;
  });

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <Row>
        <Col md={3} className="bg-light border-end">
          <h4 className="text-center py-3">Project Dashboard</h4>
          <ul className="list-unstyled">
            <li className="py-2 px-3 bg-primary text-white">Add New Project</li>
          </ul>
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>All Projects</h3>
          </div>

          <div className="mb-3">
            <Button
              color={filter === "All" ? "primary" : "secondary"}
              onClick={() => setFilter("All")}
              className="me-2"
            >
              All
            </Button>
            <Button
              color={filter === "Active" ? "primary" : "secondary"}
              onClick={() => setFilter("Active")}
              className="me-2"
            >
              Active
            </Button>
            <Button
              color={filter === "Completed" ? "primary" : "secondary"}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </Button>
          </div>

          <Table bordered>
            <thead className="bg-light">
              <tr>
                <th>Project Title</th>
                <th>Tech Stack</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((proj) => (
                <tr key={proj.id}>
                  <td>{proj.title}</td>
                  <td>{proj.techStack}</td>
                  <td>{proj.status}</td>
                  <td>{proj.priority}</td>
                  <td>{proj.startDate}</td>
                  <td>{proj.endDate}</td>
                  <td>
                    <Button color="warning" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(proj.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Form onSubmit={handleSubmit} className="mt-4">
            <h5>Add New Project</h5>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Project Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={project.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="techStack">Technology Stack</Label>
                  <Input
                    type="text"
                    name="techStack"
                    id="techStack"
                    value={project.techStack}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={project.startDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate">End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={project.endDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input
                    type="select"
                    name="status"
                    id="status"
                    value={project.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Pending</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="priority">Priority</Label>
                  <Input
                    type="select"
                    name="priority"
                    id="priority"
                    value={project.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="primary">
              Add Project
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProject;

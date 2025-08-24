"use client";
import React from "react";
import Form from "../../../../components/Form/Form";
import { useParams } from "next/navigation";
import EditEventForm from "../../../../components/Form/EditEventForm";
const page = () => {
  const params = useParams();

  const { id } = params;
  return (
    <div>
      <EditEventForm formName="Edit Event" eventId={id?.toString()} />
    </div>
  );
};

export default page;

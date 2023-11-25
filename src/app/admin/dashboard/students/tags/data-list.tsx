"use client"
import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {USERS_USERGROUP_URL} from "@/config/api";


export default function DataList() {
  const [keyGroups, setKeyGroups] = useState([]);

  useEffect(() => {
    fetch(USERS_USERGROUP_URL)
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        setKeyGroups(data.data);
      }
    })
    .catch(error => {
      console.error('Error fetching key groups:', error);
    });
  }, []);

  return (
      <Table>
        <TableCaption>Key Groups</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>班级名称</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keyGroups.map(group => (
              <TableRow key={group.id}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.tag}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}

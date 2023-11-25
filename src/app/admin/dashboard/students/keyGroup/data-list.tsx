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
import {USERS_KEYGROUP_URL, USERS_USERGROUP_URL} from "@/config/api";


export default function DataList() {
  const [keyGroups, setKeyGroups] = useState([]);

  useEffect(() => {
    fetch(USERS_KEYGROUP_URL)
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
        <TableCaption>密钥分类</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>密钥标签</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keyGroups.map(group => (
              <TableRow key={group.keyIdentity}>
                <TableCell>{group.keyIdentity}</TableCell>
                <TableCell>{group.identityName}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}

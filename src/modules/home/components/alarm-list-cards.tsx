import { PageCard } from "@/shared/components";
import { MoreVert } from "@mui/icons-material";
import { Divider, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Alarm } from "../domain/dto/alarm.dto";

interface AlarmCardProps {
  name: string;
  description: string;
  onDelete: () => void;
  onHistory: () => void;
  onRename: () => void;
}

async function getAlarms(): Promise<[]> {
  try {
    const response = await fetch(`http://localhost:3000/alarms/listar`);
    if (!response.ok) {
      throw new Error('Falha em buscar alarmes');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro buscando alarmes:', error);
    throw error;
  }
}

export function AlarmCardProps() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const menuOpen = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const alarms = await getAlarms();
        setAlarms(alarms);
      } catch (error) {
        console.error('Erro buscando alarmes:', error);
      }
    };

    fetchAlarms();
  }, []);

  return (
    <Grid container spacing={2}>
      {alarms.map((alarm, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <PageCard sx={{ width: 250, padding: "16px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                <Typography component="h2" variant="h6" fontWeight="bold">
                  {alarm.id}
                </Typography>
                <IconButton onClick={handleClickMenu}>
                  <MoreVert />
                </IconButton>
                <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
                  <MenuItem onClick={() => console.log('Programar')}>Programar</MenuItem>
                  <MenuItem onClick={() => console.log('Disparar')}>Disparar</MenuItem>
                  <MenuItem onClick={() => console.log('Renomear')}>Renomear</MenuItem>
                </Menu>
              </Grid>
              <Divider />
            </Grid>
          </PageCard>
        </Grid>
      ))}
    </Grid>
  );
}

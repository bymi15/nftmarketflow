import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import TableSkeleton from 'components/TableSkeleton';
import { getTotalSupply, getPurchasedEvents } from 'flow/query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useGlobalContext } from 'state/context';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';
import ProjectRow from './ProjectRow';
import { projects } from './Projects';

export default function ProjectTable() {
  const {
    state: { user },
    dispatch,
  } = useGlobalContext();

  const [loading, setLoading] = useState(true);
  const [projectsWithMetrics, setProjectsWithMetrics] = useState([]);

  useEffect(() => {
    async function fetchMetrics() {
      setLoading(true);
      let newProjects = [];
      for (let p of projects) {
        const items = await getTotalSupply(p.contract?.name);
        newProjects.push({ ...p, stats: { ...p.stats, items } });
      }
      setProjectsWithMetrics(newProjects);
      setLoading(false);
    }
    fetchMetrics();
  }, []);

  useEffect(() => {
    getPurchasedEvents();
  }, []);

  return (
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Flow Project Ranking
        </VuiTypography>
        <VuiBox mb={2}>
          <VuiBox display="flex" alignItems="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              The top NFTs on the Flow Blockchain, ranked by volume, floor price and other metrics.
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox>
        {loading ? (
          Array(4)
            .fill()
            .map((i) => (
              <Grid item md={12} key={i} sx={{ marginBottom: '14px' }}>
                <TableSkeleton />
              </Grid>
            ))
        ) : (
          <VuiBox sx={{ display: 'flex', flexDirection: 'column' }}>
            {projectsWithMetrics ? (
              projectsWithMetrics.map((p, index) => (
                <ProjectRow
                  key={index}
                  rank={index + 1}
                  image={p.image}
                  title={p.projectName}
                  stats={p.stats}
                  dateTime={`launched ${moment(p.launchDate).fromNow()}`}
                />
              ))
            ) : (
              <>
                <VuiTypography variant="button" fontWeight="regular" color="text">
                  No projects to display.
                </VuiTypography>
              </>
            )}
          </VuiBox>
        )}
      </VuiBox>
    </Card>
  );
}

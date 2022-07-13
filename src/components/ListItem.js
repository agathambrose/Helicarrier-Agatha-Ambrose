import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function ListItem({ data = {} }) {
	return (
		<Card>
			<CardContent>
				<div style={{ display: "flex" }}>
					<img
						height="140"
						width="140"
						src="https://source.unsplash.com/random"
						alt="Contemplative Reptile"
					/>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
							marginLeft: "20px",
						}}
					>
						<Typography gutterBottom variant="h5" component="h2">
							{data.name}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							style={{ textAlign: "left" }}
						>
							Status: {data.status}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							style={{ textAlign: "left" }}
						>
							Type: {data.type}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							style={{ textAlign: "left" }}
						>
							Mode: {data.mode}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							style={{ textAlign: "left" }}
						>
							Experience: {data.experience}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							style={{ textAlign: "left" }}
						>
							{data.description}
						</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default ListItem;

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        backgroundColor: "#fff",
        transform: "translateZ(0)"
    },
    searchInput: {
        opacity: "0.6",
        padding: "0px " + theme.spacing(1) + "px",
        fontSize: "0.8rem",
        "&:hover": {
            backgroundColor: "#f2f2f2"
        },
        "& .MuiSvgIcon-root": {
            marginRight: theme.spacing(1)
        }
    },
    btnRoot: {
        backgroundColor: "green"
    },
    btnLabel: {
        backgroundColor: "red"
    }
}); });
var Header = function () {
    var classes = useStyles();
    return (<core_1.AppBar position="static" className={classes.root}>
			<core_1.Toolbar>
				<core_1.Grid container alignItems="center">
					<core_1.Grid item>
						<core_1.InputBase placeholder="Search topics" startAdornment={<icons_1.Search fontSize="small"/>} className={classes.searchInput}/>
					</core_1.Grid>
					<core_1.Grid item sm></core_1.Grid>
					<core_1.Grid item>
						<core_1.IconButton>
							<core_1.Badge badgeContent={4} color="secondary">
								<icons_1.NotificationsNone fontSize="small"/>
							</core_1.Badge>
						</core_1.IconButton>
						<core_1.IconButton>
							<core_1.Badge badgeContent={3} color="primary">
								<icons_1.ChatBubbleOutline fontSize="small"/>
							</core_1.Badge>
						</core_1.IconButton>
						<core_1.IconButton>
							<icons_1.PowerSettingsNew />
						</core_1.IconButton>
					</core_1.Grid>
				</core_1.Grid>
			</core_1.Toolbar>
		</core_1.AppBar>);
};
exports["default"] = Header;

package glider;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.io.File;
import java.io.FileInputStream;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;


public final class DbBean {

    private Connection connection = null;
    private String sDBConexct = "jdbc/GlideDB";
    private Logger logger = null;
    private long lLongThresh = 20001l;


    public DbBean() {  // default constructor

        logger = Logger.getLogger("myLogger");

    }


    public DbBean(String sDBCon) {  // default constructor
        if (sDBCon != null) {
            sDBConexct = sDBCon;
        }
        logger = Logger.getLogger("myLogger");
    }


    private void WriteLog(String sMEssage) {
        if (sMEssage != null) {
            logger.log(Level.INFO, sMEssage);
        }

    }

    @SuppressWarnings("unused")
    private void WriteLog(Level level, String sMEssage) {

        if (sMEssage != null && level != null) {
            logger.log(level, sMEssage);
        }

    }


    private void connect() {

        try {
            connection = null;

            Context initContext = new InitialContext();
            Context envContext = (Context) initContext.lookup("java:/comp/env");
            DataSource ds = (DataSource) envContext.lookup(sDBConexct);

            /**
             System.out.println("ds1:" + sDBConexct);
             if (ds != null) {	  System.out.println("ds" + ds.toString());  }
             ***/
            connection = ds.getConnection();

        } catch (Exception e) {
            WriteLog("Error Trace in getConnection() : " + e);
            e.printStackTrace();
        }
    }


    public synchronized String[][] SQLSelect(String sSQLStment) {     //Synchronised
        // must ensure this is thread-safe as certain queries (the get last search and get history queries) happen simulatneously


        String[][] sRetvl = null;

        Statement ssStmt = null;
        ResultSet ssRs = null;


        int irowcounter = 0;
        int icolcounter = 0;

        int inumberOfColumns = 2;
        int inumberOfRows = 2;
        long start = new java.util.Date().getTime();

/*
0 = SQL Error
1 = OK
2 = No Records
*/

        try {

            if ((connection == null) || (connection.isClosed())) {
                // isClosed will not necessarily always establish if the connection was closed - it may just have been garbage collected
                connection = null;
                connect();
            }

            ssStmt = connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            ssRs = ssStmt.executeQuery(sSQLStment);


            ResultSetMetaData rsmd = ssRs.getMetaData();
            inumberOfColumns = rsmd.getColumnCount();

            if (ssRs.next()) {

                inumberOfRows = 0;
                do {
                    inumberOfRows++;
                } while (ssRs.next());

                ssRs.absolute(1);
                sRetvl = new String[(inumberOfRows)][(inumberOfColumns)];

                do {
                    for (icolcounter = 0; icolcounter < inumberOfColumns; icolcounter++) {
                        sRetvl[irowcounter][icolcounter] = ssRs.getString((icolcounter + 1));
                    }
                    irowcounter = irowcounter + 1;
                } while (ssRs.next());

            } else {
                sRetvl = new String[0][0];
            }
            return sRetvl;

        } catch (SQLException e) {

            WriteLog("SqlSelect SQL error in DbBean!!" + e);
            WriteLog(sSQLStment);
            return null;
        } catch (Exception e) {
            WriteLog("SqlSelect Exception e in DbBean!!" + e);
            WriteLog(sSQLStment);
            return null;

        } finally {
            long end = new java.util.Date().getTime();
            if (end - start > lLongThresh) {
                new Common().LogAndNotifyMailOnly("SQLSelect in DB Bean Took " + (end - start) + " to run: " + sSQLStment);
            }
            sRetvl = null;

            if (ssRs != null) {
                try {
                    ssRs.close();
                } catch (SQLException e) {
                    ;
                }
                ssRs = null;
            }
            if (ssStmt != null) {
                try {
                    ssStmt.close();
                } catch (SQLException e) {
                    ;
                }
                ssStmt = null;
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    ;
                }
            }
            connection = null;

        }

    }


    public synchronized boolean InsertBlob(String sSQLStment, File file) {


        PreparedStatement stmt = null;
        ResultSet rs = null;
        boolean bSqlupinrv = false;
        FileInputStream fis = null;
        long start = new java.util.Date().getTime();


        try {

            if (connection != null) {
                connection.close();
                connection = null;
            }
            connect();


            fis = new FileInputStream(file);
            stmt = connection.prepareStatement(sSQLStment, java.sql.ResultSet.TYPE_FORWARD_ONLY, java.sql.ResultSet.CONCUR_UPDATABLE);
            stmt.setBinaryStream(1, fis, (int) file.length());
            int istmtrs = stmt.executeUpdate();  // NOT CURRENTLY USED  - = either the row count for INSERT, UPDATE or DELETE
            if (istmtrs >= 0) {
                bSqlupinrv = true;
            }
            return bSqlupinrv;

        } catch (SQLException e) {
            WriteLog("<BR>InsertBlob SQL error in shotrent!!" + e);
            WriteLog("<BR>" + sSQLStment);
            return false;
        } catch (Exception e) {
            WriteLog("<BR>General InsertBlob SQL error in shotrent!!" + e);
            return false;
        } finally {
            long end = new java.util.Date().getTime();
            if (end - start > lLongThresh) {
                new Common().LogAndNotifyMailOnly(" Insertblob in DB Bean Took " + (end - start) + " to run: " + sSQLStment);
            }
            if (fis != null) {
                try {
                    fis.close();
                } catch (Exception ex) {
                    ;
                }
            }
            fis = null;
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            rs = null;
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            stmt = null;
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    ;
                }
            }
            connection = null;

        }

    }


    public synchronized Blob SQLSelectBlob(String sSQLStment) {     //synchronized
        // must ensure this is threadsafe as ceratin queries (the get last search and get history queries) happen simulatneously

        Statement ssStmt = null;
        ResultSet ssRs = null;
        Blob photo = null;
        long start = new java.util.Date().getTime();


        try {

            if (connection != null) {
                connection.close();
                connection = null;
            }
            connect();

            ssStmt = connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            ssRs = ssStmt.executeQuery(sSQLStment);
            if (ssRs.next()) {
                photo = ssRs.getBlob(1);
            }
            return photo;

        } catch (SQLException e) {
            WriteLog("SqlSelect SQL error in DbBean!!" + e);
            WriteLog(sSQLStment);
            return null;
        } catch (Exception e) {
            WriteLog("SqlSelectBlob Exception e in DbBean!!" + e);
            WriteLog(sSQLStment);
            return null;

        } finally {
            long end = new java.util.Date().getTime();
            if (end - start > lLongThresh) {
                new Common().LogAndNotifyMailOnly("SQLSelectBlob in DB Bean Took " + (end - start) + " to run: " + sSQLStment);
            }
            if (ssRs != null) {
                try {
                    ssRs.close();
                } catch (SQLException e) {
                    ;
                }
                ssRs = null;
            }
            if (ssStmt != null) {
                try {
                    ssStmt.close();
                } catch (SQLException e) {
                    ;
                }
                ssStmt = null;
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    ;
                }
            }
            connection = null;
        }

    }


    public synchronized long SQLIns(String sSQLStment) {    //

        Statement stmt = null;
        ResultSet rs = null;
        long lReV = -1;
        long start = new java.util.Date().getTime();

        try {

            if ((connection == null) || (connection.isClosed())) {
                // isClosed will not necessarily always establish if the connection was closed - it may just have been garbage collected
                connection = null;
                connect();
            }

            stmt = connection.createStatement(java.sql.ResultSet.TYPE_FORWARD_ONLY, java.sql.ResultSet.CONCUR_UPDATABLE);
            stmt.executeUpdate(sSQLStment, Statement.RETURN_GENERATED_KEYS); // NOT CURRENTLY USED  - = either the row count for INSERT, UPDATE or DELETE
            // statements, or 0 for SQL statements that return nothing
            rs = stmt.getGeneratedKeys();                     // FAILED INSERTS THROW AN EXCEPTION
            if (rs.next()) {
                lReV = rs.getLong(1);
            }

            rs.close();
            rs = null;

            return lReV;
        } catch (Exception e) {
            WriteLog("General SqlIns Exception e in DbBean!!" + e);
            return -1l;
        } finally {
            long end = new java.util.Date().getTime();
            if (end - start > lLongThresh) {
                new Common().LogAndNotifyMailOnly("SQLIns in DB Bean Took " + (end - start) + " to run: " + sSQLStment);
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            rs = null;
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            stmt = null;
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    ;
                }
            }
            connection = null;

        }

    }


    public synchronized boolean SQLUpIns(String sSQLStment) {


        Statement stmt = null;
        ResultSet rs = null;
        int iReV = -1;
        boolean bSqlupinrv = false;
        long start = new java.util.Date().getTime();

        try {

            if ((connection == null) || (connection.isClosed())) {
                // isClosed will not necessarily always establish if the connection was closed - it may just have been garbage collected
                connection = null;
                connect();
            }
            //System.out.println("Upins:" + sSQLStment);

            stmt = connection.createStatement(java.sql.ResultSet.TYPE_FORWARD_ONLY, java.sql.ResultSet.CONCUR_UPDATABLE);
            stmt.executeUpdate(sSQLStment, Statement.RETURN_GENERATED_KEYS); // NOT CURRENTLY USED  - = either the row count for INSERT, UPDATE or DELETE
            // statements, or 0 for SQL statements that return nothing
            rs = stmt.getGeneratedKeys();                     // FAILED INSERTS THROW AN EXCEPTION

            if (rs.next()) {
                iReV = rs.getInt(1);
            } else {
                iReV = 0;
            }

            rs.close();
            rs = null;

            if (iReV >= 0) {
                bSqlupinrv = true;
            }

            return bSqlupinrv;
        } catch (Exception e) {
            WriteLog("General SqlUpIns Exception e in DbBean!!" + e);
            return false;
        } finally {
            long end = new java.util.Date().getTime();
            if (end - start > lLongThresh) {
                new Common().LogAndNotifyMailOnly("SQLUpIns in DB Bean Took " + (end - start) + " to run: " + sSQLStment);
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            rs = null;
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            stmt = null;
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    ;
                }
            }
            connection = null;

        }

    }


    /*** Call Stored Proc, First set up stored proc thusly
     *
     DELIMITER $$

     DROP PROCEDURE IF EXISTS get_areadets $$
     CREATE PROCEDURE get_areadets(IN sub varchar(100), IN areanm varchar(100), IN prov varchar(30) )
     BEGIN
     select a.id, a.area_name,a.latitude,a.longitude,b.area_name
     from areas  a, areas as b
     where a.area_name = sub
     and a.parent_id = b.ID
     and a.region = prov
     and b.area_name = areanm
     limit 1;
     END$$
     DELIMITER ;

     #
     CALL get_areadets("Kensington", "Johannesburg", "Gauteng");

     Then use it in code as in PropertySearch.GetSubData
     ***/

    public synchronized String[][] PreparedSQLSelect(String sSQLStment, Object[] oObsToAdd) {     //synchronized
        return PreparedSQLSelect(sSQLStment, oObsToAdd, false, false);
    }

    public synchronized String[][] PreparedSQLSelect(String sSQLStment, Object[] oObsToAdd, boolean includeColNames, boolean ignoreTiming) {     //synchronized
        // must ensure this is threadsafe as ceratin queries (the get last search and get history queries) happen simulatneously

        String[][] sRetvl = null;
        PreparedStatement ssStmt = null;
        ResultSet ssRs = null;


        int irowcounter = 0;
        int icolcounter = 0;

        int inumberOfColumns = 2;
        int inumberOfRows = 2;
        long start = new java.util.Date().getTime();


        try {

            if ((connection == null) || (connection.isClosed())) {
                // isClosed will not necessarily always establish if the connection was closed - it may just have been garbage collected
                connection = null;
                connect();
            }

            ssStmt = connection.prepareStatement(sSQLStment, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

            for (int i = 1; i <= oObsToAdd.length; i++) {
                ssStmt.setObject(i, oObsToAdd[i - 1]);
            }

            ssRs = ssStmt.executeQuery();

            if (ssRs.next()) {
                ResultSetMetaData md = (ResultSetMetaData) ssRs.getMetaData();
                inumberOfColumns = md.getColumnCount();
                inumberOfRows = 0;
                do {
                    inumberOfRows++;
                } while (ssRs.next());
                if (includeColNames) {
                    inumberOfRows++;
                }

                sRetvl = new String[(inumberOfRows)][(inumberOfColumns)];

                if (includeColNames) {
                    for (int loop = 1; loop <= inumberOfColumns; loop++) {
                        sRetvl[0][loop - 1] = md.getColumnLabel(loop);
                    }
                    irowcounter++;
                }

                ssRs.absolute(1);
                do {
                    for (icolcounter = 0; icolcounter < inumberOfColumns; icolcounter++) {
                        sRetvl[irowcounter][icolcounter] = ssRs.getString((icolcounter + 1));
                    }
                    irowcounter = irowcounter + 1;
                }

                while (ssRs.next());

            } else {
                sRetvl = new String[0][0];
            }
            return sRetvl;

        } catch (SQLException e) {

            WriteLog("Prepared SQL error in DbBean!!" + e);
            WriteLog(sSQLStment);
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            WriteLog("Prepared Exception e in DbBean!!" + e);
            WriteLog(sSQLStment);
            e.printStackTrace();
            return null;

        } finally {
            long end = new java.util.Date().getTime();
            if (!ignoreTiming && (end - start > lLongThresh)) {
                new Common().LogAndNotifyMailOnly("PreparedSQLSelect in DB Bean Took " + (end - start) + " to run: " + sSQLStment);
            }
            sRetvl = null;

            if (ssRs != null) {
                try {
                    ssRs.close();
                } catch (SQLException e) {
                    ;
                }
                ssRs = null;
            }
            if (ssStmt != null) {
                try {
                    ssStmt.close();
                } catch (SQLException e) {
                    ;
                }
                ssStmt = null;
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    ;
                }
            }
            connection = null;

        }

    }


    public synchronized long PreparedSQLIns(String sSQLStment, Object[] oObsToAdd) {


        PreparedStatement stmt = null;
        ResultSet rs = null;
        long lReV = -1l;
        long start = new java.util.Date().getTime();

        try {

            if ((connection == null) || (connection.isClosed())) {
                // isClosed will not necessarily always establish if the connection was closed - it may just have been garbage collected
                connection = null;
                connect();
            }


            stmt = connection.prepareStatement(sSQLStment, Statement.RETURN_GENERATED_KEYS);
            for (int i = 1; i <= oObsToAdd.length; i++) {
                stmt.setObject(i, oObsToAdd[i - 1]);
            }
            stmt.executeUpdate();  // NOT CURRENTLY USED  - = either the row count for INSERT, UPDATE or DELETE

            rs = stmt.getGeneratedKeys();                     // FAILED INSERTS THROW AN EXCEPTION
            if (rs.next()) {

                lReV = rs.getLong(1);
            }


            return lReV;

        } catch (SQLException e) {
            WriteLog("Prepared SQL error in DbBean!!" + e);
            WriteLog(sSQLStment);
            return -2l;
        } catch (Exception e) {
            WriteLog("General SqlIns Exception e in DbBean!!" + e);
            return -3l;
        } finally {
            long end = new java.util.Date().getTime();
            if (end - start > lLongThresh) {
                new Common().LogAndNotifyMailOnly("PrepartedSQLIns in DB Bean Took " + (end - start) + " to run: " + sSQLStment);
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            rs = null;
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            stmt = null;
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    ;
                }
            }
            connection = null;

        }

    }


    public synchronized boolean PreparedSQLUpIns(String sSQLStment, Object[] oObsToAdd) {


        PreparedStatement stmt = null;
        ResultSet rs = null;
        boolean bSqlupinrv = false;
        long start = new java.util.Date().getTime();

        try {

            if ((connection == null) || (connection.isClosed())) {
                // isClosed will not necessarily always establish if the connection was closed - it may just have been garbage collected
                connection = null;
                connect();
            }
            //System.out.println("Upins:" + sSQLStment);

            stmt = connection.prepareStatement(sSQLStment, java.sql.ResultSet.TYPE_FORWARD_ONLY, java.sql.ResultSet.CONCUR_UPDATABLE);
            for (int i = 1; i <= oObsToAdd.length; i++) {
                stmt.setObject(i, oObsToAdd[i - 1]);
            }
            int istmtrs = stmt.executeUpdate();  // NOT CURRENTLY USED  - = either the row count for INSERT, UPDATE or DELETE

            if (istmtrs >= 0) {
                bSqlupinrv = true;
            }

            return bSqlupinrv;

        } catch (SQLException e) {
            WriteLog("Prepared SQL error in DbBean!!" + e);
            WriteLog(sSQLStment);
            return false;
        } catch (Exception e) {
            WriteLog("General SqlUpIns Exception e in DbBean!!" + e);
            return false;
        } finally {
            long end = new java.util.Date().getTime();
            if (end - start > lLongThresh) {
                new Common().LogAndNotifyMailOnly("PreparedSQLUpins in DB Bean Took " + (end - start) + " to run: " + sSQLStment);
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            rs = null;
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                    ;
                }
            }
            stmt = null;
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    ;
                }
            }
            connection = null;

        }

    }


}